import type { NextPage } from "next";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import {
  Avatar,
  BackgroundImage,
  Button,
  Center,
  CheckIcon,
  ColorSwatch,
  DefaultMantineColor,
  Divider,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconUserPlus } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import sendIPC from "utils/ipc/send";
import { useDisclosure } from "@mantine/hooks";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import type { Profile } from "types/profile";

const CreateProfilePage: NextPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const theme = useMantineTheme();
  const router = useRouter();
  const userUUID = uuidv4();

  const [avatarColor, setAvatarColor] = useState<DefaultMantineColor>(
    theme.primaryColor
  );

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<Profile>({
    initialValues: {
      bio: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      color: avatarColor,
      name: {
        firstName: "",
        lastName: "",
      },
      username: "",
      uuid: userUUID,
    },
    validate: {
      name: {
        firstName: isNotEmpty(),
        lastName: isNotEmpty(),
      },
      username: isNotEmpty(),
    },
  });

  // Manually update the color, since the ...props method doesn't work on the color swatches
  const updateAvatarColor = (color: DefaultMantineColor) => {
    setAvatarColor(color);
    form.setValues({
      color: color,
    });
  };

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      color={theme.colors[color][6]}
      key={color}
      style={{ cursor: "pointer" }}
      onClick={() => updateAvatarColor(color)}
      title={t(`color.${color}`)}
    >
      {color === avatarColor ? (
        <CheckIcon width={15} style={{ color: "white" }} />
      ) : null}
    </ColorSwatch>
  ));

  return (
    <>
      <Modal
        component="form"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        closeOnClickOutside={false}
        fullScreen
        onSubmit={(e) => {
          e.preventDefault();
          console.info(form.values);
          window.ipc.setDefaultUser(form.values);
          void router.push(`/${locale}`);
        }}
      >
        <Stack maw={600} mx="auto" gap="xl">
          <Title>{t("profileCreation.title", { ns: "profile" })}</Title>
          <Text>{t("profileCreation.description", { ns: "profile" })}</Text>
          <Divider />
          <Avatar
            color={form.getInputProps("color").value as string}
            size="xl"
            mx="auto"
            variant="filled"
          >
            {getUsernameInitials(
              form.getInputProps("username").value as string
            )}
          </Avatar>
          <Group>{swatches}</Group>
          <Group grow>
            <TextInput
              data-autofocus
              label={t("formLabels.firstName.label", { ns: "profile" })}
              placeholder={t("formLabels.firstName.placeholder", {
                ns: "profile",
              })}
              {...form.getInputProps("name.firstName")}
            />
            <TextInput
              label={t("formLabels.lastName.label", { ns: "profile" })}
              placeholder={t("formLabels.lastName.placeholder", {
                ns: "profile",
              })}
              {...form.getInputProps("name.lastName")}
            />
          </Group>
          <TextInput
            label={t("formLabels.username.label", { ns: "profile" })}
            placeholder={t("formLabels.username.placeholder", {
              ns: "profile",
            })}
            {...form.getInputProps("username")}
          />
          <Divider />
          <Group grow>
            <Button type="submit" disabled={!form.isValid()}>
              {t("buttons.createProfile", { ns: "profile" })}
            </Button>
            <Button c="dimmed" variant="default" onClick={close}>
              {t("buttons.cancel", { ns: "profile" })}
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Grid mah="100vh" p={0} m={0} gutter={0}>
        <Grid.Col h="100vh" span={6} m={0} p={0}>
          <BackgroundImage src="/images/dartboard.jpg" h="100%" />
        </Grid.Col>
        <Grid.Col span="auto">
          <Center h="100vh" p="xl" maw={800}>
            <Stack gap="xl">
              <Title fw="bold">
                {t("dartsmateWelcome.title", { ns: "profile" })}
              </Title>
              <Text c="dimmed" fz="xl">
                {t("dartsmateWelcome.description", { ns: "profile" })}
              </Text>
              <Group>
                <Button leftSection={<IconUserPlus />} onClick={open}>
                  {t("buttons.createProfile", { ns: "profile" })}
                </Button>
                <Button variant="default" onClick={() => sendIPC("close-app")}>
                  {t("closeApp")}
                </Button>
              </Group>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default CreateProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };

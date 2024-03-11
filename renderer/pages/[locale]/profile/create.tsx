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
import DefaultLayout from "@/components/layouts/Default";

const CreateProfilePage: NextPage = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [avatarColor, setAvatarColor] = useState<DefaultMantineColor>(
    theme.primaryColor
  );

  const [opened, { open, close }] = useDisclosure(false);
  interface FormValues {
    color: string;
    name: {
      firstName: string;
      lastName: string;
    };
    username: string;
  }

  const form = useForm<FormValues>({
    initialValues: {
      color: avatarColor,
      name: {
        firstName: "",
        lastName: "",
      },
      username: "",
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
    >
      {color === avatarColor ? (
        <CheckIcon width={15} style={{ color: "white" }} />
      ) : null}
    </ColorSwatch>
  ));

  return (
    <DefaultLayout withNavbarOpen>
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
        }}
      >
        <Stack maw={600} mx="auto" gap="xl">
          <Title>Welcome! Let's Create Your Profile</Title>
          <Text>
            Get started by entering your details. All data is stored locally and
            wont be uploaded to the internet!
          </Text>
          <Divider />
          <Avatar
            color={form.getInputProps("color").value as string}
            size="xl"
            mx="auto"
          >
            {getUsernameInitials(
              form.getInputProps("username").value as string
            )}
          </Avatar>
          <Group>{swatches}</Group>
          <Group grow>
            <TextInput
              data-autofocus
              label="First Name"
              placeholder="John"
              {...form.getInputProps("name.firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Marston"
              {...form.getInputProps("name.lastName")}
            />
          </Group>
          <TextInput
            label="Username"
            placeholder="Johnny Boy"
            {...form.getInputProps("username")}
          />
          <Divider />
          <Group grow>
            <Button type="submit" disabled={!form.isValid()}>
              Create Profile
            </Button>
            <Button c="dimmed" variant="default" onClick={close}>
              {t("closeApp")}
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
              <Title fw="bold">Welcome to Dartsmate!</Title>
              <Text c="dimmed" fz="xl">
                Your perfect companion for all things darts! Whether you're a
                casual player or a seasoned pro, Dartsmate is here to enhance
                your darting experience. Let the matches begin!
              </Text>
              <Group>
                <Button
                  tt="uppercase"
                  w="fit-content"
                  leftSection={<IconUserPlus />}
                  onClick={open}
                >
                  Create a Profile
                </Button>
                <Button
                  c="dimmed"
                  variant="default"
                  onClick={() => sendIPC("close-app")}
                >
                  {t("closeApp")}
                </Button>
              </Group>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default CreateProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };

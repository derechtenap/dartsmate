import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import type { Profile } from "types/profile";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  Avatar,
  Button,
  CheckIcon,
  ColorSwatch,
  DefaultMantineColor,
  Divider,
  Group,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { IconUserEdit } from "@tabler/icons-react";
import { useRouter } from "next/router";

const EditProfilePage: NextPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const theme = useMantineTheme();
  const router = useRouter();

  const [defaultUser, setDefaultUser] = useState<Profile | null>(null);

  const [avatarColor, setAvatarColor] = useState<DefaultMantineColor | null>(
    null
  );

  const form = useForm<Profile>({
    validate: {
      name: {
        firstName: isNotEmpty(),
        lastName: isNotEmpty(),
      },
      username: isNotEmpty(),
    },
  });

  useEffect(() => {
    // Fetching the default user and setting the form values
    void window.ipc.getDefaultUser().then((defaultUserData: Profile | null) => {
      setDefaultUser(defaultUserData);
      if (defaultUserData) {
        form.setValues(defaultUserData);
        setAvatarColor(defaultUserData.color);
      }
    });
  }, []);

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

  const handleEditProfile = () => {
    window.ipc.setDefaultUser({ ...form.values, updatedAt: Date.now() });
    void router.push(`/${locale}/profile`);
  };

  if (defaultUser) {
    return (
      <DefaultLayout withNavbarOpen>
        <Stack gap="lg" m="lg">
          <Avatar
            color={form.getInputProps("color").value as string}
            size="xl"
            mx="auto"
            variant="filled"
          >
            {getUsernameInitials(
              (form.getInputProps("username").value as string) || ""
            )}
          </Avatar>
          <Group mx="auto">{swatches}</Group>
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
          <Group>
            <Button
              disabled={!form.isValid()}
              leftSection={<IconUserEdit />}
              onClick={handleEditProfile}
              tt="uppercase"
              w="fit-content"
            >
              {t("buttons.updateProfile", { ns: "profile" })}
            </Button>
            <Button
              c="dimmed"
              variant="default"
              onClick={() => void router.push(`/${locale}/profile`)}
            >
              {t("buttons.cancel", { ns: "profile" })}
            </Button>
          </Group>
        </Stack>
      </DefaultLayout>
    );
  }
};

export default EditProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };

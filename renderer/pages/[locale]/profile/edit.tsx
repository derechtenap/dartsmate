import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import { i18n, useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import type { Profile } from "types/profile";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  Avatar,
  Button,
  CheckIcon,
  ColorSwatch,
  DefaultMantineColor,
  Group,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { IconUserEdit } from "@tabler/icons-react";
import { useRouter } from "next/router";

const EditProfilePage: NextPage = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const router = useRouter();
  const locale = i18n?.language as string;

  const [defaultUser, setDefaultUser] = useState<Profile | null>(null);

  const [avatarColor, setAvatarColor] = useState<DefaultMantineColor>(
    defaultUser?.color || theme.primaryColor
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

  if (form.values) {
    return (
      <DefaultLayout withNavbarOpen>
        {JSON.stringify(form.values)}

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
        <Group>
          <Button
            disabled={!form.isValid()}
            leftSection={<IconUserEdit />}
            onClick={handleEditProfile}
            tt="uppercase"
            w="fit-content"
          >
            Update Profile
          </Button>
          <Button
            c="dimmed"
            variant="default"
            onClick={() => void router.push(`/${locale}/profile`)}
          >
            {t("no")}
          </Button>
        </Group>
      </DefaultLayout>
    );
  }
};

export default EditProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };

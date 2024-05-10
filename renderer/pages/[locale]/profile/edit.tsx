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
  Group,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { IconUserEdit } from "@tabler/icons-react";
import { useRouter } from "next/router";
import {
  Dropzone,
  type FileWithPath,
  IMAGE_MIME_TYPE,
  type FileRejection,
} from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import resizeAvatarImage from "utils/avatars/resizeAvatarImage";
import { DEFAULT_AVATAR_FILE_SIZE } from "utils/avatars/constants";

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

  const handleFileChange = (files: FileWithPath[]) => {
    const file = files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      if (!e.target) return;

      try {
        const resizedBase64 = await resizeAvatarImage({ file: file });
        form.setFieldValue("avatarImage", resizedBase64);
      } catch (error) {
        console.error("Error resizing the file: ", error);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleImageRejection = (files: FileRejection[]) => {
    /**
     * We expect that the array contains only one file since the dropzone
     * is configured to accept a single file at a time. Nonetheless, we
     * check if files array is not empty to prevent accessing undefined.
     */
    if (files.length === 0) {
      console.error("Expected one image file, but the file array was empty.");
      return;
    }

    const file = files[0];

    notifications.show({
      autoClose: 20000, // 20 seconds
      title: t(`errors.${file.errors[0].code}.title`),
      message: t(`errors.${file.errors[0].code}.message`),
    });
  };

  if (defaultUser) {
    return (
      <DefaultLayout withNavbarOpen>
        <Stack gap="xl" mt="xl">
          <Avatar
            color={form.getValues().color}
            src={form.values.avatarImage}
            size="xl"
            mx="auto"
            variant="filled"
          >
            <Dropzone
              onDrop={(files) => handleFileChange(files)}
              onReject={(files) => handleImageRejection(files)}
              maxSize={DEFAULT_AVATAR_FILE_SIZE}
              accept={IMAGE_MIME_TYPE}
              styles={{
                root: {
                  background: "transparent",
                  border: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                },
              }}
              maxFiles={1}
              multiple={false}
            >
              {getUsernameInitials(form.values.username)}
            </Dropzone>
          </Avatar>
          <Button
            disabled={!form.values.avatarImage}
            onClick={() => form.setFieldValue("avatarImage", undefined)}
          >
            {t("buttons.resetAvatarImage", { ns: "profile" })}
          </Button>
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
          <Group>
            <Button
              disabled={!form.isValid() || !form.isTouched()}
              leftSection={<IconUserEdit />}
              onClick={handleEditProfile}
            >
              {t("buttons.updateProfile", { ns: "profile" })}
            </Button>
            <Button
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

import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import type { Profile } from "types/profile";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  Button,
  CheckIcon,
  ColorSwatch,
  DefaultMantineColor,
  Group,
  Stack,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
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
import ProfileAvatar from "@/components/content/ProfileAvatar";

const EditProfilePage: NextPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const theme = useMantineTheme();
  const router = useRouter();

  const [defaultProfile, setDefaultProfile] = useState<Profile | null>(null);

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
    void window.ipc
      .getDefaultProfile()
      .then((defaultProfileData: Profile | null) => {
        setDefaultProfile(defaultProfileData);
        if (defaultProfileData) {
          form.setValues(defaultProfileData);
          setAvatarColor(defaultProfileData.color);
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
    <Tooltip key={color} label={t(`color.${color}`)} withArrow>
      <ColorSwatch
        color={theme.colors[color][6]}
        style={{ cursor: "pointer" }}
        onClick={() => updateAvatarColor(color)}
      >
        {color === avatarColor ? (
          <CheckIcon width={15} style={{ color: theme.white }} />
        ) : null}
      </ColorSwatch>
    </Tooltip>
  ));

  const handleEditProfile = () => {
    window.ipc.setDefaultProfile({ ...form.values, updatedAt: Date.now() });
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

  if (defaultProfile) {
    return (
      <DefaultLayout withNavbarOpen>
        <Stack gap="xl" mt="xl">
          <Dropzone
            onDrop={(files) => handleFileChange(files)}
            onReject={(files) => handleImageRejection(files)}
            maxSize={DEFAULT_AVATAR_FILE_SIZE}
            accept={IMAGE_MIME_TYPE}
            maxFiles={1}
            multiple={false}
          >
            <ProfileAvatar profile={form.values} size="xl" mx="auto" />
          </Dropzone>
          <Button
            disabled={!form.values.avatarImage}
            onClick={() => form.setFieldValue("avatarImage", undefined)}
          >
            {t("profile:buttons.resetAvatarImage")}
          </Button>
          <Group mx="auto">{swatches}</Group>
          <Group grow>
            <TextInput
              data-autofocus
              label={t("profile:formLabels.firstName.label")}
              placeholder={t("profile:formLabels.firstName.placeholder")}
              {...form.getInputProps("name.firstName")}
            />
            <TextInput
              label={t("profile:formLabels.lastName.label")}
              placeholder={t("profile:formLabels.lastName.placeholder")}
              {...form.getInputProps("name.lastName")}
            />
          </Group>
          <TextInput
            label={t("profile:formLabels.username.label")}
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
              {t("profile:buttons.updateProfile")}
            </Button>
            <Button
              variant="default"
              onClick={() => void router.push(`/${locale}/profile`)}
            >
              {t("cancel")}
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

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
} from "@mantine/dropzone";
import Resizer from "react-image-file-resizer";

const EditProfilePage: NextPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const theme = useMantineTheme();
  const router = useRouter();
  const avatarFileSize = 5 * 1024 ** 2; // 5MB
  const avatarWidth = 128; // px
  const avatarHeight = 128; // px

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
        const resizedBase64 = await resizeImage(file);
        form.setFieldValue("avatarImage", resizedBase64);
      } catch (error) {
        console.error("Error resizing the file: ", error);
      }
    };

    reader.readAsDataURL(file);
  };

  const resizeImage = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        avatarWidth, // New width
        avatarHeight, // New height
        "WEBP", // Output format
        75, // Quality
        0, // Rotation
        (uri) => {
          if (typeof uri === "string") {
            resolve(uri);
          } else {
            reject(new Error("Failed to resize image"));
          }
        },
        "base64"
      );
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
              onDrop={(files) => {
                handleFileChange(files);
              }}
              onReject={(files) => console.log("Rejected files", files)}
              maxSize={avatarFileSize}
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
            RESET_AVATAR
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
        <code>
          {JSON.stringify([
            form.isValid(),
            form.isTouched(),
            form.isDirty(),
            form.values,
          ])}
        </code>
      </DefaultLayout>
    );
  }
};

export default EditProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };

import type { NextPage } from "next";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import {
  Avatar,
  Box,
  Button,
  CheckIcon,
  ColorSwatch,
  DefaultMantineColor,
  FileButton,
  Group,
  Paper,
  Stack,
  Stepper,
  Text,
  TextInput,
  Textarea,
  Title,
  Tooltip,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useTranslation } from "next-i18next";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import type { Profile } from "types/profile";

import resizeAvatarImage from "utils/avatars/resizeAvatarImage";

import OnlyControlsLayout, {
  headerHeightOnlyControls,
} from "@/components/layouts/OnlyControlsLayout";
import {
  IconCamera,
  IconForms,
  IconPhotoUp,
  IconPhotoX,
  IconUserCircle,
} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";

const CreateProfilePage: NextPage = () => {
  const params = useSearchParams();
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

  const isGuestProfile = params.get("isGuest") ? true : false;

  const form = useForm<Profile>({
    initialValues: {
      avatarImage: undefined,
      bio: "",
      createdAt: Date.now(),
      isGuestProfile: isGuestProfile,
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
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (file: File | null) => {
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

  const pageHeight = `calc(100vh - ${headerHeightOnlyControls}px)`;

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const stepIconsStyles = { width: rem(18), height: rem(18) };

  const renderStepHeader = (title: string, description: string) => {
    return (
      <Paper p="lg" withBorder>
        <Title>{t(title, { ns: "profile" })}</Title>
        <Text c="dimmed">{t(description, { ns: "profile" })}</Text>
      </Paper>
    );
  };

  useEffect(() => {
    handleFileChange(file);
  }, [file, setFile]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.info("Is Guest?", isGuestProfile);

    // TODO: Check if the process was successful!
    if (isGuestProfile) {
      window.ipc.setGuestProfile(form.values);
      void router.push(`/${locale}`);
      return;
    }

    window.ipc.setDefaultProfile(form.values);

    void router.push(`/${locale}`);
  };
  return (
    <OnlyControlsLayout>
      <Box component="form" h={pageHeight} onSubmit={(e) => handleSubmit(e)}>
        <Stack p="lg" justify="space-between" maw={1200} mx="auto" h="100%">
          <Stepper
            active={active}
            allowNextStepsSelect={false}
            onStepClick={setActive}
          >
            <Stepper.Step
              icon={<IconForms style={stepIconsStyles} />}
              label={t("step.label.profile", { ns: "profile" })}
            >
              {renderStepHeader(
                "profileCreation.title",
                "profileCreation.description"
              )}
              {JSON.stringify(router.query)}{" "}
              <Stack my="lg">
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
                <Textarea
                  label={t("formLabels.bio.label", { ns: "profile" })}
                  placeholder={t("formLabels.bio.placeholder", {
                    ns: "profile",
                  })}
                  {...form.getInputProps("bio")}
                />
              </Stack>
            </Stepper.Step>
            <Stepper.Step label={t("step.label.misc", { ns: "profile" })}>
              {renderStepHeader(
                "stepsProfileCreation.misc.title",
                "stepsProfileCreation.misc.description"
              )}
              <Group mt="lg">{swatches}</Group>
            </Stepper.Step>
            <Stepper.Step
              icon={<IconUserCircle style={stepIconsStyles} />}
              label={t("step.label.avatar", { ns: "profile" })}
            >
              {renderStepHeader(
                "stepsProfileCreation.avatar.title",
                "stepsProfileCreation.avatar.description"
              )}
              <Avatar
                color={form.values.color}
                src={form.values.avatarImage}
                size="xl"
                mt="lg"
                mx="auto"
                variant="filled"
              >
                {getUsernameInitials(form.values.username)}
              </Avatar>
              <Group justify="center" mt="lg">
                <Button
                  disabled
                  leftSection={<IconCamera stroke={1.5} />}
                  variant="default"
                >
                  {t("webcam", { ns: "profile" })}
                </Button>
                <FileButton
                  onChange={setFile}
                  accept="image/png,image/jpeg"
                  aria-label={t("photoUpload", { ns: "profile" })}
                  multiple={false}
                >
                  {(props) => (
                    <Button
                      {...props}
                      leftSection={<IconPhotoUp stroke={1.5} />}
                      variant="default"
                    >
                      {t("photoUpload", { ns: "profile" })}
                    </Button>
                  )}
                </FileButton>
                <Button
                  variant="default"
                  leftSection={<IconPhotoX stroke={1.5} />}
                  disabled={!form.values.avatarImage}
                  onClick={() =>
                    void form.setFieldValue("avatarImage", undefined)
                  }
                >
                  {t("removePhotoUpload", { ns: "profile" })}
                </Button>
              </Group>
            </Stepper.Step>
            <Stepper.Completed>
              <Group grow>
                <Button type="submit" disabled={!form.isValid()}>
                  {t("buttons.createProfile", { ns: "profile" })}
                </Button>
                <Button
                  variant="default"
                  onClick={() => void router.push(`/${locale}/welcome`)}
                >
                  {t("buttons.cancel", { ns: "profile" })}
                </Button>
              </Group>
              {JSON.stringify(form.values)}
            </Stepper.Completed>
          </Stepper>
          <Paper component={Group} p="xs" withBorder justify="space-between">
            <Button
              variant="default"
              disabled={active === 0}
              onClick={prevStep}
            >
              {t("back")}
            </Button>
            <Button
              disabled={active === 3 || !form.isValid()}
              onClick={nextStep}
            >
              {t("next")}
            </Button>
          </Paper>
        </Stack>
      </Box>
    </OnlyControlsLayout>
  );
};

export default CreateProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };

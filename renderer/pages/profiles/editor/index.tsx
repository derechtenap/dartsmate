import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import {
  Avatar,
  Button,
  CheckIcon,
  ColorSwatch,
  DefaultMantineColor,
  Divider,
  Grid,
  Group,
  Kbd,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { Profile } from "types/profile";
import { randomUUID } from "crypto";
import { createFile } from "utils/fs/createFile";
import { PROFILES_DIR, PROFILE_FILENAME_EXTENSION } from "utils/constants";
import path from "path";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { getViewportHeight } from "utils/misc/getViewportHeight";
import PageHeader from "@/components/content/PageHeader";
import { IconInfoCircleFilled } from "@tabler/icons-react";

const ProfileEditorPage: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const profile = query.profile
    ? (JSON.parse(query.profile as string) as Profile)
    : undefined;

  const theme = useMantineTheme();
  const [avatarColor, setAvatarColor] = useState<DefaultMantineColor>(
    profile?.color || "red"
  );
  const form = useForm<Profile>({
    initialValues: {
      bio: profile?.bio || "",
      color: avatarColor,
      createdAt: profile?.createdAt || Date.now(),
      username: profile?.username || "",
      updatedAt: Date.now(),
      uuid: profile?.uuid || randomUUID(),
    },

    validate: {
      bio: hasLength(
        { min: 0, max: 300 },
        "Your bio can only be 300 characters long"
      ),
      color: isNotEmpty(),
      username: hasLength(
        { min: 3, max: 16 },
        "Username must be 3-16 characters long"
      ),
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

  const createProfile = () => {
    if (form.isValid()) {
      form.clearErrors();
      createFile(
        path.join(PROFILES_DIR, form.values.uuid + PROFILE_FILENAME_EXTENSION),
        JSON.stringify(form.values)
      );
      router.back();
    }
  };

  const EDITOR_MODE = query.mode || "create"; // Default to create mode when the query mode is undefined

  console.info(EDITOR_MODE, query);

  return (
    <form
      onSubmit={form.onSubmit(() => {
        createProfile();
      })}
    >
      <DefaultLayout isSuccess={true}>
        <Grid maw={1000} h={getViewportHeight() || "fit-content"} mx="auto">
          <Grid.Col span={12}>
            <PageHeader
              title={
                EDITOR_MODE === "create"
                  ? "Create your Profile"
                  : "Update your Profile"
              }
            >
              {EDITOR_MODE === "create"
                ? "Here, you can set up your personal profile."
                : "Here you can update the profile."}
              <Divider />
            </PageHeader>
          </Grid.Col>
          <Grid.Col span={4} mr="xl">
            <Stack>
              <Avatar color={form.values.color} size={200}>
                {getUsernameInitials(form.values.username || "John Marston")}
              </Avatar>
              <Title size="h6">Color</Title>
              <Group mb="lg">{swatches}</Group>
              <Divider />
              <Group align="flex-start">
                <IconInfoCircleFilled />
                <Text color="dimmed" fz="xs" w={256}>
                  Click on the avatar to upload a profile picture. If you don't
                  select a picture, the avatar will display your profile
                  initials.
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span="auto" ml="xl">
            <Stack>
              <TextInput
                description="Your Username will be shown in various places throughout the app. You can change it anytime."
                placeholder="John Marston"
                label="Username"
                {...form.getInputProps("username")}
              />
              <Textarea
                placeholder="An optional small biography about your achievements in darts, you as a player or something else."
                description={
                  <>
                    Tip: Press <Kbd size="xs">Windows Key</Kbd> +{" "}
                    <Kbd size="xs">.</Kbd> on Windows devices to open the emoji
                    keyboard.
                  </>
                }
                label="Bio"
                {...form.getInputProps("bio")}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={12}>
            <Divider />
            <Group mt="lg">
              <Button color="red" type="submit">
                {EDITOR_MODE === "create" ? "Create Profile" : "Update Profile"}
              </Button>
              <Button
                color="dark"
                variant="subtle"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </DefaultLayout>
    </form>
  );
};

export default ProfileEditorPage;

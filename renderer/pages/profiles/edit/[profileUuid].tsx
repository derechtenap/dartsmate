import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  ColorSwatch,
  DefaultMantineColor,
  Flex,
  Group,
  Stack,
  Textarea,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
// import { Dropzone } from "@mantine/dropzone";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Profile } from "types/profile";
import { createFile } from "utils/fs/createFile";
import { PROFILES_DIR } from "utils/constants";
import path from "path";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { readFileSync } from "fs";

const EditProfilePage: NextPage = () => {
  const { back, query } = useRouter();
  const [avatarColor, setAvatarColor] = useState<DefaultMantineColor>("blue");

  const form = useForm<Profile>({
    initialValues: {
      createdAt: 0,
      uuid: "------",
      bio: "",
      color: "blue",
      username: "",
      updatedAt: Date.now(),
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

  useEffect(() => {
    const profile = readFileSync(
      path.join(PROFILES_DIR, `${query.profileUuid as string}.json`),
      "utf8"
    );
    const profileJSON = JSON.parse(profile) as Profile;

    form.setValues({
      bio: profileJSON.bio,
      color: profileJSON.color,
      username: profileJSON.username,
      updatedAt: Date.now(),
      createdAt: profileJSON.createdAt,
      uuid: profileJSON.uuid,
    });

    setAvatarColor(profileJSON.color);
  }, []);

  // Manually update the color, since the ...props method doesn't work on the color swatches
  const updateAvatarColor = (color: DefaultMantineColor) => {
    setAvatarColor(color);
    form.setValues({
      color: color,
    });
  };

  const theme = useMantineTheme();
  const swatches = Object.keys(theme.colors).map((color) => (
    <UnstyledButton key={color} onClick={() => updateAvatarColor(color)}>
      <ColorSwatch color={theme.colors[color][6]} />
    </UnstyledButton>
  ));

  const createProfile = () => {
    // console.info("Creating profile...", form.values);
    if (form.isValid()) {
      form.clearErrors();
      createFile(
        `${path.join(PROFILES_DIR, query.profileUuid as string)}.json`,
        JSON.stringify(form.values)
      );
      back();
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(() => {
        createProfile();
      })}
    >
      <DefaultLayout>
        <Flex direction="column" h="100%">
          <Group position="apart">
            <PageHeader title="Edit Profile">
              Manage your profile by making edits below.
            </PageHeader>
            <Tooltip label="Back">
              <ActionIcon variant="transparent" onClick={() => back()}>
                <IconSquareRoundedX />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Center style={{ flex: 1 }}>
            <Stack w="66%" maw={600}>
              <Avatar mx="auto" color={avatarColor} size="xl">
                {getUsernameInitials(form.values.username)}
              </Avatar>
              <Group p="lg">{swatches}</Group>
              <TextInput
                placeholder="John Marston"
                label="Username"
                {...form.getInputProps("username")}
              />
              <Textarea
                placeholder="An optional small biography about your achievements in darts, you as a player or something else"
                label="Bio"
                {...form.getInputProps("bio")}
              />
              <Group>
                <Button type="submit">Update Profile</Button>
                <Button variant="subtle" onClick={() => back()}>
                  Cancel
                </Button>
              </Group>
            </Stack>
          </Center>
        </Flex>
      </DefaultLayout>
    </form>
  );
};

export default EditProfilePage;

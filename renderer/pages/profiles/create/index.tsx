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
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { Profile } from "types/profile";
import { randomUUID } from "crypto";
import { createFile } from "utils/fs/createFile";
import { PROFILES_DIR, PROFILE_FILENAME_EXTENSION } from "utils/constants";
import path from "path";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";

const CreateProfilePage: NextPage = () => {
  const { back } = useRouter();
  const [avatarColor, setAvatarColor] = useState<DefaultMantineColor>("blue");
  const form = useForm<Profile>({
    initialValues: {
      bio: "",
      color: avatarColor,
      createdAt: Date.now(),
      username: "",
      updatedAt: Date.now(),
      uuid: randomUUID(),
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

  const theme = useMantineTheme();
  const swatches = Object.keys(theme.colors).map((color) => (
    <UnstyledButton key={color} onClick={() => updateAvatarColor(color)}>
      <ColorSwatch color={theme.colors[color][6]} />
    </UnstyledButton>
  ));

  const createProfile = () => {
    if (form.isValid()) {
      form.clearErrors();
      createFile(
        path.join(PROFILES_DIR, form.values.uuid + PROFILE_FILENAME_EXTENSION),
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
      <DefaultLayout isSuccess={true}>
        <Flex direction="column" h="100%">
          <Group position="apart">
            <PageHeader title="Create Profile">
              Your profile stores your games, statistics and achievements in
              DartMate. You can update your profile at any time.
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
                <Button type="submit">Create Profile</Button>
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

export default CreateProfilePage;

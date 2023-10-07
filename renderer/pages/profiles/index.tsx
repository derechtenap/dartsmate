import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconEdit,
  IconSquareRoundedX,
  IconTrashX,
  IconUserPlus,
  IconUserQuestion,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { PROFILES_DIR, PROFILE_FILENAME_EXTENSION } from "utils/constants";
import path from "path";
import { useDisclosure } from "@mantine/hooks";
import { Profile } from "types/profile";
import { getLocaleDate } from "utils/misc/getLocalDate";
import { useRouter } from "next/router";
import { deleteFile } from "utils/fs/deleteFile";
import { useProfiles } from "hooks/useProfiles";
import ProfileAvatar from "@/components/content/ProfileAvatar";

const ProfilesPage: NextPage = () => {
  const { push, reload } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedProfile, setOpenedProfile] = useState<Profile>();
  const {
    isFetching,
    isLoading,
    isSuccess,
    data: profiles,
    refetch,
  } = useProfiles();

  const deleteProfile = () => {
    if (!openedProfile || !openedProfile.uuid) return;

    const profilePath = path.join(
      PROFILES_DIR,
      openedProfile.uuid + PROFILE_FILENAME_EXTENSION
    );

    // Delete file on os, refetch the query and reset the state
    setOpenedProfile(undefined);
    close();
    deleteFile(profilePath);
    void refetch();
  };

  return (
    <DefaultLayout
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <Modal opened={opened} onClose={close} title="Delete Profile?" centered>
        <Text>
          Do you really want to delete the Profile "{openedProfile?.username}"?
        </Text>
        <Group mt="lg">
          <Button color="red" onClick={() => deleteProfile()}>
            Delete Profile
          </Button>
          <Button variant="subtle" onClick={() => close()}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Grid>
        <Grid.Col span={3}>
          <ScrollArea.Autosize mah="calc(100vh - 2rem)">
            <Stack my="xs">
              <Group>
                <Link href="/profiles/create">
                  <Button
                    component="a"
                    leftIcon={<IconUserPlus />}
                    variant="gradient"
                  >
                    Create Profile
                  </Button>
                </Link>
              </Group>
              {isSuccess ? (
                profiles.map((profile) => (
                  <UnstyledButton
                    key={profile.uuid}
                    onClick={() => setOpenedProfile(profile)}
                  >
                    <Group>
                      <ProfileAvatar profile={profile} />
                      <Text color="dimmed">{profile.username}</Text>
                    </Group>
                  </UnstyledButton>
                ))
              ) : (
                <Stack mt="xl">
                  <Text ta="center">Unable to load the profiles...</Text>
                  <Button onClick={() => reload()}>Reload Page</Button>
                </Stack>
              )}
            </Stack>
          </ScrollArea.Autosize>
        </Grid.Col>
        <Grid.Col span="auto">
          {openedProfile ? (
            <>
              <Flex justify="space-between">
                <Group>
                  <ProfileAvatar profile={openedProfile} size="xl" />
                  <Title>
                    {openedProfile.username}
                    <Text c="dimmed" fz="xs">
                      Member Since: {getLocaleDate(openedProfile.createdAt)}
                    </Text>
                  </Title>
                </Group>
                <Group>
                  <Tooltip label="Delete Profile">
                    <ActionIcon
                      color="red"
                      variant="transparent"
                      onClick={() => open()}
                    >
                      <IconTrashX />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Edit Profile">
                    <ActionIcon
                      variant="transparent"
                      onClick={() =>
                        void push(`/profiles/edit/${openedProfile.uuid}`)
                      }
                    >
                      <IconEdit />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Close Profile">
                    <ActionIcon
                      variant="transparent"
                      onClick={() => setOpenedProfile(undefined)}
                    >
                      <IconSquareRoundedX />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Flex>
              <Paper p="xs" withBorder mt="lg">
                <Text
                  c="dimmed"
                  fz="sm"
                  fs={openedProfile.bio.length ? "" : "italic"}
                  style={{ wordBreak: "break-word" }}
                >
                  {openedProfile.bio.length
                    ? openedProfile.bio
                    : "This user has not added a bio yet. You can edit the profile to add a bio."}
                </Text>
              </Paper>
            </>
          ) : (
            <Center h="calc(100vh - 2rem)">
              <Flex
                ta="center"
                direction="column"
                align="center"
                justify="center"
                gap="lg"
              >
                <IconUserQuestion size="4rem" />
                <Title fz="h3" fw="bold">
                  No Profile Selected
                </Title>
                <Text color="dimmed" mb="lg">
                  It looks like you haven't selected a profile yet. To get
                  started, choose a profile from the list on the left, or create
                  a new one.
                </Text>
              </Flex>
            </Center>
          )}
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default ProfilesPage;

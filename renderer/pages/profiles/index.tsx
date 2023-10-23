import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconEdit,
  IconFileAnalytics,
  IconList,
  IconTrash,
  IconTrophy,
  IconUserPlus,
} from "@tabler/icons-react";
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
import { getViewportHeight } from "utils/misc/getViewportHeight";
import PageHeader from "@/components/content/PageHeader";

const ProfilesPage: NextPage = () => {
  const {
    isFetching,
    isLoading,
    isSuccess,
    data: profiles,
    refetch,
  } = useProfiles();
  const { push, reload } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedProfile, setOpenedProfile] = useState<Profile>(profiles[0]);

  const deleteProfile = () => {
    if (!openedProfile || !openedProfile.uuid) return;

    const profilePath = path.join(
      PROFILES_DIR,
      openedProfile.uuid + PROFILE_FILENAME_EXTENSION
    );

    // Delete file on os, refetch the query and reset the state
    setOpenedProfile(profiles[0]);
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
      <Grid align="flex-start">
        <Grid.Col span={3} lg={2}>
          <Paper withBorder>
            <ScrollArea.Autosize
              mah={getViewportHeight()}
              mih={getViewportHeight()}
              maw={400}
              p="xs"
              mx="auto"
            >
              <Stack>
                <Button w="100%" color="red" variant="filled" tt="uppercase">
                  <Group>
                    <IconUserPlus /> Create Profile
                  </Group>
                </Button>
                {profiles.map((profile) => (
                  <UnstyledButton
                    key={profile.uuid}
                    onClick={() => setOpenedProfile(profile)}
                  >
                    <Group fz="sm">
                      <ProfileAvatar profile={profile} size="md" />
                      <Text truncate>{profile.username}</Text>
                    </Group>
                  </UnstyledButton>
                ))}
              </Stack>
            </ScrollArea.Autosize>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto">
          <Paper>
            <Group align="flex-start">
              <ProfileAvatar size="xl" profile={openedProfile} />
              <PageHeader title={openedProfile.username}>
                Member Since: {getLocaleDate(openedProfile.createdAt)}
              </PageHeader>
              <Group ml="auto">
                <ActionIcon>
                  <Tooltip label="Edit Profile">
                    <IconEdit />
                  </Tooltip>
                </ActionIcon>
                <ActionIcon>
                  <Tooltip label="Delete Profile">
                    <IconTrash />
                  </Tooltip>
                </ActionIcon>
              </Group>
            </Group>
            <Tabs color="red" defaultValue="achievements" mt="lg">
              <Tabs.List grow position="apart">
                <Tabs.Tab
                  value="achievements"
                  icon={<IconTrophy size="0.8rem" />}
                >
                  Achievements
                </Tabs.Tab>
                <Tabs.Tab
                  value="statistics"
                  icon={<IconFileAnalytics size="0.8rem" />}
                >
                  Statistics
                </Tabs.Tab>
                <Tabs.Tab value="matches" icon={<IconList size="0.8rem" />}>
                  Matches
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="achievements" pt="xs">
                <Text fs="italic">
                  Achievements will be added in a later version.
                </Text>
              </Tabs.Panel>
              <Tabs.Panel value="statistics" pt="xs">
                <Text fs="italic">
                  Profile statistics will be added in a later version.
                </Text>
              </Tabs.Panel>
              <Tabs.Panel value="matches" pt="xs">
                <Text fs="italic">
                  Match statistics will be added in a later version.
                </Text>
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default ProfilesPage;

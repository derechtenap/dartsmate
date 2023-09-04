import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Modal,
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
import { useEffect, useState } from "react";
import { readFolder } from "utils/fs/readFolder";
import { PROFILES_DIR } from "utils/constants";
import { readFileSync } from "fs";
import path from "path";
import { useDisclosure, useListState } from "@mantine/hooks";
import { Profile } from "types/profile";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { getLocaleDate } from "utils/misc/getLocalDate";
import { useRouter } from "next/router";
import { deleteFile } from "utils/fs/deleteFile";

const ProfilesPage: NextPage = () => {
  const { push } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [profileList, setProfileList] = useListState<Profile>([]);
  const [openedProfile, setOpenedProfile] = useState<Profile>();

  const deleteProfile = () => {
    if (!openedProfile || !openedProfile.uuid) return;
    const profilePath = path.join(PROFILES_DIR, `${openedProfile.uuid}.json`);

    setOpenedProfile(undefined);
    close();
    deleteFile(profilePath);
  };

  const createProfileList = () => {
    setProfileList.setState([]);
    // Get a list of local profiles files
    const profiles = readFolder(PROFILES_DIR);

    // Read each profile file and append it to a state
    profiles.forEach((profileFile: string) => {
      const data = readFileSync(path.join(PROFILES_DIR, profileFile), "utf8");
      const json = JSON.parse(data) as Profile;

      setProfileList.append(json);
    });
  };

  useEffect(() => {
    createProfileList();
  }, [openedProfile]);

  return (
    <DefaultLayout>
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
              {profileList.map((player, _idx) => (
                <UnstyledButton
                  key={_idx}
                  onClick={() => setOpenedProfile(player)}
                >
                  <Group>
                    <Avatar color={player.color} radius="md">
                      {getUsernameInitials(player.username)}
                    </Avatar>
                    <Text color="dimmed">{player.username}</Text>
                  </Group>
                </UnstyledButton>
              ))}
            </Stack>
          </ScrollArea.Autosize>
        </Grid.Col>
        <Grid.Col span="auto">
          {openedProfile ? (
            <>
              <Flex justify="space-between">
                <Group>
                  <Avatar color={openedProfile.color} size="xl" radius="md">
                    {getUsernameInitials(openedProfile.username)}
                  </Avatar>
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
              {openedProfile.bio !== "" && (
                <Card mt="lg">
                  <Text c="dimmed" fz="sm" style={{ wordBreak: "break-word" }}>
                    {openedProfile.bio}
                  </Text>
                </Card>
              )}
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

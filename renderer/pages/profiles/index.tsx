import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Flex,
  Grid,
  Group,
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
  IconUserPlus,
  IconUserQuestion,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readFolder } from "utils/fs/readFolder";
import { PROFILES_DIR } from "utils/constants";
import { readFileSync } from "fs";
import path from "path";
import { useListState } from "@mantine/hooks";
import { Profile } from "types/profile";

const ProfilesPage: NextPage = () => {
  const [openProfileId, setOpenProfileID] = useState<number | null>(null);
  const [profileList, setProfileList] = useListState<Profile>([]);

  useEffect(() => {
    setProfileList.setState([]);
    // Get a list of local profiles files
    const profiles = readFolder(PROFILES_DIR);

    // Read each profile file and append it to a state
    profiles.forEach((profileFile: string) => {
      const data = readFileSync(path.join(PROFILES_DIR, profileFile), "utf8");
      const json = JSON.parse(data) as Profile;

      setProfileList.append(json);
    });
  }, []);

  return (
    <DefaultLayout>
      <Grid>
        <Grid.Col span={3}>
          <ScrollArea.Autosize mah="calc(100vh - 2rem)">
            <Stack my="xs">
              <Group>
                <Link href="/profiles/createProfile">
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
                  onClick={() => setOpenProfileID(_idx)}
                >
                  <Group>
                    <Avatar color="grape" radius="md">
                      {player.name.charAt(0)}
                    </Avatar>
                    <Text color="dimmed">{player.name}</Text>
                  </Group>
                </UnstyledButton>
              ))}
            </Stack>
          </ScrollArea.Autosize>
        </Grid.Col>
        <Grid.Col span="auto">
          {openProfileId !== null ? (
            <Flex justify="space-between">
              <Group>
                <Avatar color="grape" size="xl" radius="md">
                  {profileList[openProfileId].name.charAt(0)}
                </Avatar>
                <Title>{profileList[openProfileId].name}</Title>
              </Group>
              <Group>
                <Tooltip label="Edit Profile">
                  <ActionIcon variant="transparent">
                    <IconEdit />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Close Profile">
                  <ActionIcon
                    variant="transparent"
                    onClick={() => setOpenProfileID(null)}
                  >
                    <IconSquareRoundedX />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Flex>
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

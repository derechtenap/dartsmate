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
import type { MantineColor } from "@mantine/core";
import {
  IconEdit,
  IconSquareRoundedX,
  IconUserPlus,
  IconUserQuestion,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const ProfilesPage: NextPage = () => {
  const [openedProfile, setOpenedProfile] = useState<number | null>(null);

  // TODO: Remove the dummy data later
  const dummyPlayers: {
    color: MantineColor;
    name: string;
  }[] = [
    {
      color: "blue",
      name: "nap",
    },
    {
      color: "indigo",
      name: "Feedback",
    },
    {
      color: "grape",
      name: "Luke Skywalker",
    },
    {
      color: "pink",
      name: "Darth Vader",
    },
  ];
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
                    btn.createProfile
                  </Button>
                </Link>
              </Group>
              {dummyPlayers.map((player, _idx) => (
                <UnstyledButton
                  key={_idx + 1}
                  onClick={() => setOpenedProfile(_idx + 1)}
                >
                  <Group>
                    <Avatar color={player.color} radius="md">
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
          {openedProfile ? (
            <Flex justify="space-between">
              <Group>
                <Avatar
                  color={dummyPlayers[openedProfile - 1].color}
                  size="xl"
                  radius="md"
                >
                  {dummyPlayers[openedProfile - 1].name.charAt(0)}
                </Avatar>
                <Title>{dummyPlayers[openedProfile - 1].name}</Title>
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
                    onClick={() => setOpenedProfile(null)}
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
                  emptyState
                </Title>
                <Text color="dimmed" mb="lg">
                  emptyState.text
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

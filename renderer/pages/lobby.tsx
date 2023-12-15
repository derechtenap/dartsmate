import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Grid,
  Group,
  Input,
  NativeSelect,
  NumberInput,
  ScrollArea,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useProfiles } from "hooks/useProfiles";
import { Profile } from "types/profile";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { Match, Player } from "types/match";
import { randomUUID } from "crypto";
import { createFile } from "utils/fs/createFile";
import {
  DEFAULT_MATCH_SETTINGS,
  MATCHES_DIR,
  MATCH_FILENAME_EXTENSION,
  MATCH_SCORE,
} from "utils/constants";
import path from "path";
import { useRouter } from "next/router";
import pkg from "../../package.json";
import { useAddCurrentMatch } from "hooks/useCurrentMatch";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import {
  IconSearch,
  IconTarget,
  IconUserMinus,
  IconUserOff,
  IconUserPlus,
  IconUsersPlus,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ActionButton from "@/components/content/ActionButton";
import { getViewportHeight } from "utils/misc/getViewportHeight";
import EmptyState from "@/components/content/EmptyState";
import Link from "next/link";

const LobbyPage: NextPage = () => {
  const router = useRouter();
  const contentHeight = getViewportHeight();
  const { isFetching, isLoading, isSuccess, data: profiles } = useProfiles();
  const { mutate } = useAddCurrentMatch();
  const [matchPlayerList, setMatchPlayerList] = useState<Player[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  // TODO: Automatically load match settings from previous match or let the user load them via preset
  const form = useForm<Match>({
    initialValues: {
      appVersion: pkg.version,
      createdAt: Date.now(),
      initialScore: DEFAULT_MATCH_SETTINGS.SCORE,
      players: matchPlayerList,
      matchCheckout: DEFAULT_MATCH_SETTINGS.CHECKOUT,
      matchStatus: DEFAULT_MATCH_SETTINGS.STATUS,
      matchUUID: randomUUID(),
      updatedAt: Date.now(),
    },

    validate: {
      initialScore: isInRange(
        { min: MATCH_SCORE.MIN, max: MATCH_SCORE.MAX },
        `Your Score must be between ${MATCH_SCORE.MIN} and ${MATCH_SCORE.MAX}!`
      ),
      players: isNotEmpty("You need to selected at least one Player!"),
    },
  });

  const handleStartMatch = () => {
    form.validate();
    if (!form.isValid()) return;

    try {
      createFile(
        path.join(
          MATCHES_DIR,
          form.values.matchUUID + MATCH_FILENAME_EXTENSION
        ),
        JSON.stringify(form.values)
      );

      void mutate(form.values.matchUUID);

      void router.push(`/match/${form.values.matchUUID}/playing`);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlayerListUpdate = (profile: Profile): void => {
    // Add missing object keys, so the profile will be of type Player
    const player: Player = {
      ...profile,
      scoreLeft: -1, // -1 means that the player has not thrown yet
      isWinner: false,
      rounds: [],
    };

    setMatchPlayerList((prevPlayerList) => {
      // Check if the player is already in matchPlayerList
      const isPlayerInList = prevPlayerList.some(
        (existingPlayer) => existingPlayer.uuid === player.uuid
      );

      if (isPlayerInList) {
        // Remove the player from the matchPlayerList
        const updatedPlayerList = prevPlayerList.filter(
          (existingPlayer) => existingPlayer.uuid !== player.uuid
        );
        form.setFieldValue("players", updatedPlayerList);
        return updatedPlayerList;
      } else {
        // Add the player to the matchPlayerList state
        const updatedPlayerList = [...prevPlayerList, player];
        form.setFieldValue("players", updatedPlayerList);
        return updatedPlayerList;
      }
    });
  };

  const isPlayerListEmpty = matchPlayerList.length === 0;

  return (
    <DefaultLayout
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        title="Choose Your Players"
      >
        <Stack>
          {profiles.length === 0 ? (
            <EmptyState
              title="Where is everybody?"
              text="We couldn't find any profiles!"
            >
              <Link href="/profiles">
                <Button mt="lg">Create Profiles</Button>
              </Link>
            </EmptyState>
          ) : (
            <>
              <Input icon={<IconSearch />} placeholder="Search..." disabled />
              {profiles.map((profile) => {
                // Check if the profile is already in matchPlayerList
                const isProfileInList = matchPlayerList.some(
                  (player) => player.uuid === profile.uuid
                );
                return (
                  <Box
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      textAlign: "center",
                      display: "flex",
                      gap: theme.spacing.lg,
                      alignItems: "center",
                      padding: theme.spacing.sm,
                      borderRadius: theme.radius.md,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
                            : theme.colors.gray[1],
                      },
                    })}
                    key={profile.uuid}
                    onClick={() => handlePlayerListUpdate(profile)}
                  >
                    <ProfileAvatar profile={profile} />
                    <Text color={isProfileInList ? "revert" : "dimmed"}>
                      {profile.username}
                    </Text>
                    <ActionIcon ml="auto" variant="default">
                      {isProfileInList ? <IconUserMinus /> : <IconUserPlus />}
                    </ActionIcon>
                  </Box>
                );
              })}
            </>
          )}
        </Stack>
      </Drawer>
      <Grid h="100%" m={0}>
        <Grid.Col span={9} py={0}>
          {isPlayerListEmpty ? (
            <EmptyState
              title="Where is everyone again?"
              text="Add players by clicking the button below."
            >
              <Button mt="lg" onClick={open}>
                Add Players
              </Button>
            </EmptyState>
          ) : (
            <ScrollArea.Autosize
              mah={contentHeight - 5}
              mih={contentHeight - 5}
              placeholder=""
            >
              <Stack mr="xl">
                <Title fz="lg">Players</Title>
                <Table highlightOnHover>
                  <thead>
                    <tr>
                      <th>
                        <Text fz="xs" tt="uppercase" mr="auto">
                          {matchPlayerList.length} Players
                        </Text>
                      </th>
                      <th>
                        <Flex align="center" gap="lg" justify="end">
                          <ActionButton
                            action={open}
                            icon={<IconUsersPlus />}
                            label="Add Players"
                            size="1.25rem"
                          />
                          <ActionButton
                            action={() => setMatchPlayerList([])}
                            icon={<IconUserOff />}
                            label="Remove all Players"
                            size="1.25rem"
                          />
                        </Flex>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchPlayerList.map((player) => (
                      <tr key={player.uuid}>
                        <td>
                          <Group>
                            <ProfileAvatar profile={player} size="md" />
                            <Text truncate>{player.username}</Text>
                          </Group>
                        </td>
                        <td>
                          <ActionButton
                            action={() => handlePlayerListUpdate(player)}
                            icon={<IconUserMinus />}
                            label={`Remove ${player.username}`}
                            ml="auto"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Stack>
            </ScrollArea.Autosize>
          )}
        </Grid.Col>
        <Grid.Col span="auto" p={0}>
          <Box
            h="100%"
            style={{ display: "grid", alignContent: "space-between" }}
          >
            <Stack>
              <Title fz="xl">Match Settings</Title>
              <NumberInput
                label="Score"
                variant="filled"
                {...form.getInputProps("initialScore")}
              />
              <NativeSelect
                data={["Any", "Single", "Double", "Triple"]}
                label="Checkout"
                variant="filled"
                {...form.getInputProps("matchCheckout")}
              />
            </Stack>
            <Button
              tt="uppercase"
              disabled={isPlayerListEmpty}
              onClick={() => handleStartMatch()}
            >
              <Group>
                <IconTarget /> Start Match
              </Group>
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default LobbyPage;

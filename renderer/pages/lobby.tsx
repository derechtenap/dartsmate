import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Grid,
  Group,
  Input,
  NativeSelect,
  NumberInput,
  Stack,
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
import { MATCHES_DIR, MATCH_FILENAME_EXTENSION } from "utils/constants";
import path from "path";
import { useRouter } from "next/router";
import pkg from "../../package.json";
import { useAddCurrentMatch } from "hooks/useCurrentMatch";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import {
  IconCheck,
  IconMinus,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTarget,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const LobbyPage: NextPage = () => {
  const router = useRouter();
  const { isFetching, isLoading, isSuccess, data: profiles } = useProfiles();
  const { mutate } = useAddCurrentMatch();
  const [matchPlayerList, setMatchPlayerList] = useState<Player[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  // TODO: Automatically load match settings from previous match or let the user load them via preset
  const form = useForm<Match>({
    initialValues: {
      appVersion: pkg.version,
      createdAt: Date.now(),
      initialScore: 501,
      players: matchPlayerList,
      matchCheckout: "Double",
      matchStatus: "started",
      matchUUID: randomUUID(),
      updatedAt: Date.now(),
    },

    validate: {
      initialScore: isInRange(
        { min: 3, max: 901 },
        "Your Score must be between 3 and 901!"
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
                  {isProfileInList ? <IconMinus /> : <IconPlus />}
                </ActionIcon>
              </Box>
            );
          })}
        </Stack>
      </Drawer>
      <Grid h="100%" m={0}>
        <Grid.Col span={9} p={0}>
          {matchPlayerList.length === 0 ? (
            <Group
              position="center"
              h="100%"
              display="flex"
              style={{ flexDirection: "column" }}
            >
              <IconUserPlus size="5rem" />
              <Title fz="xl">No players added yet. Ready to play?</Title>
              <Button onClick={open}>Add Players</Button>
            </Group>
          ) : (
            <Stack>
              <Title fz="lg">Players</Title>
              <Text fz="xs">
                Currently {matchPlayerList.length} Players are participating.
                You can remove Players by clicking on them.
              </Text>
              <Button
                onClick={open}
                w="fit-content"
                variant="outline"
                size="xs"
              >
                Add more Players
              </Button>
              {matchPlayerList.map((player) => (
                <Group fz="sm" key={player.uuid}>
                  <ProfileAvatar profile={player} size="md" />
                  <Text truncate>{player.username}</Text>
                </Group>
              ))}
            </Stack>
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
              disabled={form.values.players.length === 0}
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

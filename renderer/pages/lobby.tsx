import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";
import {
  Button,
  Card,
  Grid,
  Group,
  Indicator,
  NativeSelect,
  NumberInput,
  Stack,
  Tabs,
  Text,
  UnstyledButton,
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
  IconSettings,
  IconTarget,
  IconUserCircle,
} from "@tabler/icons-react";

const LobbyPage: NextPage = () => {
  const router = useRouter();
  const { isSuccess, data: profiles } = useProfiles();
  const { mutate } = useAddCurrentMatch();
  const [matchPlayerList, setMatchPlayerList] = useState<Player[]>([]);

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
      scoreLeft: form.values.initialScore,
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
    <DefaultLayout>
      <PageHeader title="Lobby">
        <Text>
          You are just a few clicks away from starting your match. Please select
          the players and if needed, update the settings. Let's get started!
        </Text>
      </PageHeader>
      <Tabs variant="outline" defaultValue="players">
        <Tabs.List mb="lg">
          <Tabs.Tab value="players" icon={<IconUserCircle size="0.8rem" />}>
            Select Players
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
            Settings
          </Tabs.Tab>
          <Button
            tt="uppercase"
            ml="auto"
            style={{ borderEndEndRadius: 0, borderEndStartRadius: 0 }}
            disabled={form.values.players.length === 0}
          >
            <Group>
              <IconTarget /> Start Match
            </Group>
          </Button>
        </Tabs.List>

        <Tabs.Panel value="players" pt="xs">
          {isSuccess ? (
            <Grid gutter="lg">
              {profiles.map((profile) => {
                // Check if the profile is already in matchPlayerList
                const isProfileInList = matchPlayerList.some(
                  (player) => player.uuid === profile.uuid
                );

                return (
                  <Grid.Col sm={3} xl={2} key={profile.uuid}>
                    <UnstyledButton
                      onClick={() => handlePlayerListUpdate(profile)}
                      miw="100%"
                    >
                      <Card
                        withBorder
                        style={{
                          borderColor: isProfileInList ? "revert" : undefined,
                        }}
                        ta="center"
                      >
                        <Stack>
                          <Indicator
                            label={<IconCheck size="12px" />}
                            disabled={!isProfileInList}
                            size={24}
                          >
                            <ProfileAvatar profile={profile} mx="auto" />{" "}
                          </Indicator>
                          <Text fz="xs" tt="uppercase">
                            {profile.username}
                          </Text>
                        </Stack>
                      </Card>
                    </UnstyledButton>
                  </Grid.Col>
                );
              })}
            </Grid>
          ) : (
            <>UNABLE_TO_LOAD_PROFILES!</>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="settings" pt="xs">
          <Stack>
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
        </Tabs.Panel>
      </Tabs>
    </DefaultLayout>
  );
};

export default LobbyPage;

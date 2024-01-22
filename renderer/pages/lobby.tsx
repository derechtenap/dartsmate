import type { NextPage } from "next";
import DefaultLayout, { navbarWidth } from "@/components/layouts/Default";
import {
  ActionIcon,
  Autocomplete,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
  Divider,
  Drawer,
  Flex,
  Grid,
  Group,
  Input,
  NativeSelect,
  NumberInput,
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
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
import EmptyState from "@/components/content/EmptyState";
import Link from "next/link";
import { getViewportHeight } from "utils/misc/getViewportHeight";

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
      <ScrollArea.Autosize ml={navbarWidth + 1} h={getViewportHeight()}>
        <Container maw={1200} py="lg">
          <Grid>
            <Grid.Col span={7}>
              <Card bg="transparent">Left</Card>
            </Grid.Col>
            <Grid.Col span={5}>
              <Card withBorder>
                <Title size="h3" tt="uppercase">
                  Match Settings
                </Title>
                <Stack my="lg">
                  <Divider label="Score" labelPosition="left" />
                  <SegmentedControl
                    color="red"
                    defaultValue="501"
                    data={[
                      /* TODO: Add custom score input */
                      {
                        label: "301",
                        value: "301",
                      },
                      {
                        label: "501",
                        value: "501",
                      },
                      {
                        label: "701",
                        value: "701",
                      },
                    ]}
                    size="xs"
                    tt="uppercase"
                  />
                  <Divider
                    label="Starting and Finishing Rules"
                    labelPosition="left"
                  />
                  <SegmentedControl
                    color="red"
                    data={["Straight in", "Double in", "Master in"]}
                    size="xs"
                    tt="uppercase"
                  />
                  <SegmentedControl
                    color="red"
                    defaultValue="Double out"
                    data={["Straight out", "Double out", "Master out"]}
                    size="xs"
                    tt="uppercase"
                  />
                  <Divider label="Win Condition" labelPosition="left" />
                  <SegmentedControl
                    color="red"
                    defaultValue="Best of"
                    data={["Best of", "First to"]}
                    size="xs"
                    tt="uppercase"
                  />
                  <Group grow>
                    <NumberInput min={1} max={16} defaultValue={3} />
                    <SegmentedControl
                      color="red"
                      defaultValue="Legs"
                      data={["Sets", "Legs"]}
                      size="xs"
                      tt="uppercase"
                    />
                  </Group>
                  <Divider label="Additional Settings" labelPosition="left" />
                  <CheckboxGroup>
                    <Checkbox label="Random Starting Player" />
                    <Checkbox my="xs" label="Enable Teams" />
                  </CheckboxGroup>
                </Stack>
                <Divider variant="dashed" />
                <Button tt="uppercase" fullWidth mt="md" radius="xs">
                  Start Match
                </Button>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </ScrollArea.Autosize>
    </DefaultLayout>
  );
};

export default LobbyPage;

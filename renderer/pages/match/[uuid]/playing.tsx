import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  List,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { readFileSync } from "fs";
import { MATCHES_DIR } from "utils/constants";
import path from "path";
import { Match } from "types/match";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { IconCircleCheck, IconUsersGroup } from "@tabler/icons-react";

const GamePlayingPage: NextPage = () => {
  const router = useRouter();
  const matchQueryUuid = router.query.uuid;
  const [matchData, setMatchData] = useState<Match>();

  useEffect(() => {
    const data = readFileSync(
      path.join(MATCHES_DIR, `${matchQueryUuid as string}.json`),
      "utf8"
    );

    setMatchData(JSON.parse(data) as Match);
  }, []);

  const scores = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    25, 50,
  ];

  if (matchData) {
    return (
      <Group grow h="100vh">
        <Box p="sm" h="100%">
          <Title mb="lg">Match {matchData.matchUuid}</Title>
          <Text mb="xl" fz="sm" color="dimmed">
            Players: {matchData.profiles.length} - Checkout:{" "}
            {matchData.checkout} - Match Type: {matchData.matchType} - Status:{" "}
            {matchData.matchStatus} - App Version: {matchData.appVersion}
          </Text>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Player</th>
                <th>Score Left</th>
                <th>AVG</th>
              </tr>
            </thead>
            <tbody>
              {matchData.profiles.map((profile) => (
                <tr key={profile.uuid}>
                  <td>
                    <Group>
                      <Avatar size="md" color={profile.color}>
                        {getUsernameInitials(profile.username)}
                      </Avatar>
                      {profile.username}
                    </Group>
                  </td>
                  <td>{matchData.matchType}</td>
                  <td>0.0</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        <Box p="sm" h="100%">
          <Grid grow>
            {scores.map((score) => (
              <Grid.Col span={3} key={score}>
                <Button variant="light" w="100%" radius={0}>
                  {score}
                </Button>
              </Grid.Col>
            ))}
          </Grid>
          <Stack ta="center" my="xl">
            <Title size="h1">0</Title>
            <Text>- - -</Text>
          </Stack>
          <Grid>
            <Grid.Col span={3}>
              <Button variant="subtle" w="100%" radius={0}>
                Double
              </Button>
            </Grid.Col>
            <Grid.Col span={3}>
              <Button variant="subtle" w="100%" radius={0}>
                Triple
              </Button>
            </Grid.Col>
            <Grid.Col span={3}>
              <Button variant="subtle" w="100%" radius={0} disabled>
                Undo
              </Button>
            </Grid.Col>
            <Grid.Col span={3}>
              <Button w="100%" radius={0} disabled>
                Next Player
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Group>
    );
  }
  return <>UNABLE TO LOAD MATCH FILE!</>;
};

export default GamePlayingPage;

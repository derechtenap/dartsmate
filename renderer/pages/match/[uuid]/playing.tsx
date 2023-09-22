import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { readFileSync } from "fs";
import { MATCHES_DIR } from "utils/constants";
import path from "path";
import { Match } from "types/match";
import { getTotalRoundScore } from "utils/match/getTotalRoundScore";
import { DARTBOARD_ZONES, THROWS_PER_ROUND } from "utils/constants";
import ProfileAvatar from "@/components/content/ProfileAvatar";

const GamePlayingPage: NextPage = () => {
  const router = useRouter();
  const matchQueryUuid = router.query.uuid;
  const [matchData, setMatchData] = useState<Match>();
  const [roundThrows, setRoundThrows] = useState<number[]>([]);
  const [isDouble, setIsDouble] = useState<boolean>(false);
  const [isTriple, setIsTriple] = useState<boolean>(false);

  useEffect(() => {
    const data = readFileSync(
      path.join(MATCHES_DIR, `${matchQueryUuid as string}.json`),
      "utf8"
    );

    setMatchData(JSON.parse(data) as Match);
  }, []);

  const handleAddThrow = (score: number) => {
    if (roundThrows.length > THROWS_PER_ROUND) return;

    setRoundThrows((prevScores) => [...prevScores, score]);
  };

  const handleRemoveThrow = () => {
    // Remove the latest throw
    const updatedThrows = roundThrows.slice(0, roundThrows.length - 1);

    setRoundThrows(updatedThrows);
  };

  if (!matchQueryUuid) {
    return <>Unable to Create the Match!</>;
  }

  if (!matchData) {
    return <>Unable to Load the Match!</>;
  }

  return (
    <Group grow h="100vh">
      <Box p="sm" h="100%">
        <Title mb="lg">
          {matchData.profiles.length} Player Match - {matchData.matchType}{" "}
          {matchData.checkout} Out
        </Title>
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
                    <ProfileAvatar profile={profile} />
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
          {DARTBOARD_ZONES.map((score) => (
            <Grid.Col span={3} key={score}>
              <Button
                variant="light"
                w="100%"
                radius={0}
                onClick={() => handleAddThrow(score)}
                disabled={roundThrows.length >= THROWS_PER_ROUND}
              >
                {score}
              </Button>
            </Grid.Col>
          ))}
          <Grid.Col span={12}>
            <Divider />
          </Grid.Col>
          <Grid.Col span={4}>
            <Button
              variant={isDouble ? "default" : "light"}
              w="100%"
              radius={0}
              onClick={() => setIsDouble(!isDouble)}
            >
              Double
            </Button>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button
              variant={isTriple ? "default" : "light"}
              w="100%"
              radius={0}
              onClick={() => setIsTriple(!isTriple)}
            >
              Triple
            </Button>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button
              color="red"
              variant="filled"
              w="100%"
              radius={0}
              disabled={roundThrows.length === 0}
              onClick={() => handleRemoveThrow()}
            >
              Undo
            </Button>
          </Grid.Col>
        </Grid>
        <Stack my="xl" ta="center">
          <Title>{getTotalRoundScore(roundThrows)}</Title>
          <Group mx="auto">
            {Array.from({ length: THROWS_PER_ROUND }, (_, index) => (
              <Box key={index}>
                {roundThrows[index] ? roundThrows[index] : `Dart ${index + 1}`}
              </Box>
            ))}
          </Group>
        </Stack>
        <Button
          w="100%"
          radius={0}
          disabled={roundThrows.length !== THROWS_PER_ROUND}
        >
          Next Player
        </Button>
      </Box>
    </Group>
  );
};

export default GamePlayingPage;

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
import { useToggle } from "@mantine/hooks";

const GamePlayingPage: NextPage = () => {
  const router = useRouter();
  const matchQueryUuid = router.query.uuid;
  const [matchData, setMatchData] = useState<Match>();
  const [roundThrows, setRoundThrows] = useState<number[]>([]);
  const [isDouble, isDoubleToggle] = useToggle([false, true]);
  const [isTriple, isTripleToggle] = useToggle([false, true]);

  useEffect(() => {
    if (matchQueryUuid) {
      const data = readFileSync(
        path.join(MATCHES_DIR, `${matchQueryUuid as string}.json`),
        "utf8"
      );
      setMatchData(JSON.parse(data) as Match);
    }
  }, [matchQueryUuid]);

  const handleAddThrow = (score: number) => {
    // Check if the maximum throws per round has been reached
    if (roundThrows.length >= THROWS_PER_ROUND) return;

    let multipliedScore = score;

    // If the player's throw hits the outer bull or bullseye,
    // the score remains unchanged, regardless of the selected multiplier.
    if (score !== 25 && score !== 50) {
      // Apply the multiplier if selected
      if (isDouble) {
        multipliedScore = score * 2;
      }

      if (isTriple) {
        multipliedScore = score * 3;
      }
    }

    // Add the calculated (multiplied or unchanged) score
    setRoundThrows((prevScores) => [...prevScores, multipliedScore]);

    // Reset the double and triple multipliers
    isDoubleToggle(false);
    isTripleToggle(false);
  };

  const handleRemoveThrow = () => {
    // Remove the latest throw
    const updatedThrows = roundThrows.slice(0, roundThrows.length - 1);

    setRoundThrows(updatedThrows);
  };

  const handleScoreMultiplier = (multiplier: "double" | "triple"): void => {
    const isDoubleMultiplier = multiplier === "double";

    if (isDoubleMultiplier) {
      isDoubleToggle(!isDouble);
      isTripleToggle(false);
      return;
    }

    isDoubleToggle(false);
    isTripleToggle(!isTriple);
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
              disabled={roundThrows.length === THROWS_PER_ROUND}
              variant={isDouble ? "light" : ""}
              w="100%"
              radius={0}
              onClick={() => handleScoreMultiplier("double")}
            >
              Double
            </Button>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button
              disabled={roundThrows.length === THROWS_PER_ROUND}
              variant={isTriple ? "light" : ""}
              w="100%"
              radius={0}
              onClick={() => handleScoreMultiplier("triple")}
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

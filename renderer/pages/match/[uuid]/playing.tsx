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
// import { useState } from "react";
import { writeFileSync } from "fs";
import { MATCHES_DIR, MATCH_FILENAME_EXTENSION } from "utils/constants";
import path from "path";
import type { Match } from "types/match";
import { getTotalRoundScore } from "utils/match/getTotalRoundScore";
import { DARTBOARD_ZONES, THROWS_PER_ROUND } from "utils/constants";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import { useListState, useToggle } from "@mantine/hooks";
// import type { Profile } from "types/profile";
import { useCurrentMatch } from "hooks/useCurrentMatch";
import type { UUID } from "crypto";
import LoadingOverlay from "@/components/LoadingOverlay";

const GamePlayingPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;
  //const [matchData, setMatchData] = useState<Match>();
  // const [currentPlayer, setCurrentPlayer] = useState<Profile>();
  const [roundScore, updateRoundScore] = useListState<number>([]);
  const [isDouble, isDoubleToggle] = useToggle([false, true]);
  const [isTriple, isTripleToggle] = useToggle([false, true]);

  const {
    isLoading,
    isSuccess,
    data: matchData,
  } = useCurrentMatch(uuid as UUID);

  const handleAddScore = (score: number): void => {
    // Check if the maximum throws per round has been reached
    if (roundScore.length >= THROWS_PER_ROUND) return;

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
    updateRoundScore.append(multipliedScore);

    // Reset the double and triple multipliers
    isDoubleToggle(false);
    isTripleToggle(false);
  };

  const handleRemoveLatestScore = (): void => {
    // Remove the latest throw
    updateRoundScore.remove(roundScore.length - 1);
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

  const handleRoundUpdate = (): void => {
    console.info("UPDATE_ROUND");
  };

  const handleAbortMatch = (): void => {
    // Update match file and redirect to results page
    if (matchData) {
      const updatedMatchData: Match = {
        ...matchData,
        updatedAt: Date.now(),
        matchStatus: "ABORTED",
      };

      writeFileSync(
        path.join(
          MATCHES_DIR,
          `${matchData.matchUuid + MATCH_FILENAME_EXTENSION}`
        ),
        JSON.stringify(updatedMatchData),
        "utf8"
      );

      void router.push(`/match/${matchData.matchUuid}/results`);
      return;
    }

    console.error("Couldn't update match file! `matchData` was undefined!");
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!isSuccess || !matchData) {
    return <>Unable to Load the Match!</>;
  }

  return (
    <Group grow h="100vh">
      <Box p="sm" h="100%">
        <Title>
          {matchData.profiles.length} Player Match - {matchData.matchType}{" "}
          {matchData.checkout} Out
        </Title>
        <Button
          color="red"
          variant="light"
          my="xl"
          onClick={() => handleAbortMatch()}
        >
          Abort Game
        </Button>
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
                onClick={() => handleAddScore(score)}
                disabled={roundScore.length >= THROWS_PER_ROUND}
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
              disabled={roundScore.length === THROWS_PER_ROUND}
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
              disabled={roundScore.length === THROWS_PER_ROUND}
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
              disabled={roundScore.length === 0}
              onClick={() => handleRemoveLatestScore()}
            >
              Undo
            </Button>
          </Grid.Col>
        </Grid>
        <Stack my="xl" ta="center">
          <Title>{getTotalRoundScore(roundScore)}</Title>
          <Group mx="auto">
            {Array.from({ length: THROWS_PER_ROUND }, (_, index) => (
              <Box key={index}>
                {roundScore[index] ? roundScore[index] : `Dart ${index + 1}`}
              </Box>
            ))}
          </Group>
        </Stack>
        <Button
          w="100%"
          radius={0}
          disabled={roundScore.length !== THROWS_PER_ROUND}
          onClick={() => handleRoundUpdate()}
        >
          Next Player
        </Button>
      </Box>
    </Group>
  );
};

export default GamePlayingPage;

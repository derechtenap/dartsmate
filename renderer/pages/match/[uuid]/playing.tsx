import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCurrentMatch } from "hooks/useCurrentMatch";
import type { UUID } from "crypto";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/layouts/Default";
import { Button, Card, Grid, Group, Stack, Text } from "@mantine/core";
import {
  DARTBOARD_ZONES,
  SCORE_BULLSEYE,
  SCORE_MISSED,
  SCORE_OUTER_BULL,
  THROWS_PER_ROUND,
} from "utils/constants";
import { DartThrow } from "types/match";
import { getTotalRoundScore } from "utils/match/getTotalRoundScore";
import { handleRoundUpdate } from "utils/match/handleRoundUpdate";

const GamePlayingPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // TODO: Add randomize player Start
  const [multipliers, setMultipliers] = useState({
    double: false,
    triple: false,
  });
  const [roundThrows, setRoundThrows] = useState<DartThrow[]>([]);

  const {
    isLoading,
    isSuccess,
    data: matchData,
    refetch,
  } = useCurrentMatch(uuid as UUID);

  useEffect(() => {
    console.info(matchData);
  }, [matchData]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!isSuccess || !matchData) {
    return <DefaultLayout>Unable to Load the Match!</DefaultLayout>;
  }

  const handleMultipliers = (multiplier: "DOUBLE" | "TRIPLE") => {
    if (multiplier === "DOUBLE") {
      return setMultipliers({ double: !multipliers.double, triple: false });
    }

    return setMultipliers({ double: false, triple: !multipliers.triple });
  };

  const handleAddThrow = (zone: number) => {
    if (roundThrows.length > THROWS_PER_ROUND) return;

    // Disable multipliers when the zone is missed, outer bull or bullseye
    const disableMultiplier =
      zone === SCORE_MISSED ||
      zone === SCORE_OUTER_BULL ||
      zone === SCORE_BULLSEYE;

    const newThrow: DartThrow = {
      isBullseye: zone === 50,
      isDouble: disableMultiplier ? false : multipliers.double,
      isTriple: disableMultiplier ? false : multipliers.triple,
      isMissed: zone === 0,
      isOuterBull: zone === 25,
      dartboardZone: zone,
      score: disableMultiplier
        ? zone
        : multipliers.double
        ? zone * 2
        : zone * 3,
    };

    setRoundThrows((prevThrows) => [...prevThrows, newThrow]);

    // Reset multipliers
    setMultipliers({ double: false, triple: false });
  };

  const handleRemoveLastThrow = () => {
    setRoundThrows((prevThrows) => prevThrows.slice(0, roundThrows.length - 1));
  };

  const handleNewRound = () => {
    handleRoundUpdate(
      matchData.players[currentPlayerIndex],
      roundThrows,
      matchData
    );

    // TODO: Update currentPlayerIndex
    setCurrentPlayerIndex((currentPlayerIndex + 1) % matchData.players.length);
    setRoundThrows([]);
    void refetch();
  };

  console.info(roundThrows);

  return (
    <Grid gutter="xl" m="lg">
      <Grid.Col md="auto">
        <Grid>
          {matchData?.players.map((player, _idx) => (
            <Grid.Col sm={6} lg={3} key={player.uuid}>
              <Card
                withBorder
                style={{
                  borderColor:
                    currentPlayerIndex === _idx ? "revert" : undefined,
                }}
              >
                <Stack ta="center">
                  <Text fz="xs" tt="uppercase">
                    {player.username}
                  </Text>
                  <Text fz="1.75rem" fw="bold" color={player.color}>
                    {player.scoreLeft === -1 // -1 indicates that the player hasn't thrown yet
                      ? matchData.initialScore
                      : player.scoreLeft}
                  </Text>
                  <Text fz="md">
                    {player.rounds.length > 0 && (
                      <>
                        {(
                          player.rounds.reduce(
                            (total, round) => total + round.roundAverage,
                            0
                          ) / player.rounds.length
                        ).toFixed(1)}
                      </>
                    )}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Grid.Col>
      <Grid.Col md={4} xl={3}>
        <Grid grow>
          {DARTBOARD_ZONES.map((zone) => (
            <Grid.Col md={3} key={zone}>
              <Button
                variant="light"
                w="100%"
                onClick={() => handleAddThrow(zone)}
                disabled={roundThrows.length === THROWS_PER_ROUND}
              >
                {zone}
              </Button>
            </Grid.Col>
          ))}
        </Grid>
        <Stack ta="center" my="lg" mx={0}>
          <Group my="lg" position="apart" grow>
            <Button
              onClick={() => handleMultipliers("DOUBLE")}
              variant={multipliers.double ? "light" : "default"}
              disabled={roundThrows.length === THROWS_PER_ROUND}
            >
              Double
            </Button>
            <Button
              onClick={() => handleMultipliers("TRIPLE")}
              variant={multipliers.triple ? "light" : "default"}
              disabled={roundThrows.length === THROWS_PER_ROUND}
            >
              Triple
            </Button>
            <Button
              disabled={roundThrows.length === 0}
              onClick={() => handleRemoveLastThrow()}
            >
              Undo
            </Button>
          </Group>
          <Text fz="3rem" fw="bold">
            {getTotalRoundScore(roundThrows.map((throws) => throws.score))}
          </Text>
          <Group mx="auto">
            {Array.from({ length: THROWS_PER_ROUND }, (_, _idx) => (
              <Text fz="xl" key={_idx}>
                {roundThrows[_idx]?.isDouble
                  ? "D"
                  : roundThrows[_idx]?.isTriple
                  ? "T"
                  : undefined}
                {roundThrows[_idx]?.dartboardZone ?? "-"}
              </Text>
            ))}
          </Group>
          <Button
            mt="xl"
            disabled={roundThrows.length !== THROWS_PER_ROUND}
            onClick={() => handleNewRound()}
          >
            Next Player
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default GamePlayingPage;

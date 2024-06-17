import type { NextPage } from "next";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import {
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  NumberFormatter,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  darken,
  getThemeColor,
  rem,
  useMantineTheme,
} from "@mantine/core";

import { useTranslation } from "next-i18next";

import OnlyControlsLayout from "@/components/layouts/OnlyControlsLayout";

import type {
  Checkout,
  DartThrow,
  Match,
  MatchRound,
  Player,
} from "types/match";
import { useEffect, useState } from "react";
import { useListState, useSessionStorage } from "@mantine/hooks";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import {
  DARTBOARD_ZONES,
  SCORE_BULLSEYE,
  SCORE_MISSED,
  SCORE_OUTER_BULL,
  THROWS_PER_ROUND,
} from "utils/constants";
import { IconCrown, IconEraser } from "@tabler/icons-react";
import { getScores, getTotalRoundScore } from "utils/match/getTotalRoundScore";
import { applyScoreMultiplier } from "utils/match/helper/applyScoreMultiplier";
import isNonMultipleScore from "utils/match/helper/isNonMultipleScore";
import { getTotalMatchAvg } from "utils/match/getTotalMatchAvg";

const PlayingPage: NextPage = () => {
  const theme = useMantineTheme();

  const { t } = useTranslation();
  const [matchSessionData, setMatchSessionData] = useSessionStorage<Match>({
    defaultValue: undefined,
    key: "currentMatch",
  });

  const [players, playersActions] = useListState<Player>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState<{
    double: boolean;
    triple: boolean;
  }>({ double: false, triple: false });
  const [matchRound, setMatchRound] = useState<DartThrow[]>([]);

  useEffect(() => {
    if (matchSessionData) {
      // Indicates the game hasn't started jet
      if (matchSessionData.players[0].scoreLeft === -1) {
        const updatedPlayers = matchSessionData.players.map((player) => ({
          ...player,
          scoreLeft: matchSessionData.initialScore,
        }));

        playersActions.setState(updatedPlayers);
      }
    }
  }, [matchSessionData]);

  const scores = getScores(matchRound);
  const totalRoundScore = getTotalRoundScore(scores);

  const handleUpdateCurrentPlayerIndex = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  if (!matchSessionData) {
    // TODO: Add better loading state if matchData is not available yet
    return <div>Loading...</div>;
  }

  const renderName = (name: Player["name"]) => {
    return `${name.firstName} ${name.lastName}`;
  };

  const handleMultiplierToggle = (
    multiplierType: "double" | "triple"
  ): void => {
    // Toggle the selected multiplier and reset the other to false
    setScoreMultiplier((prevMultiplier) => ({
      ...prevMultiplier,
      [multiplierType]: !prevMultiplier[multiplierType],
      [multiplierType === "double" ? "triple" : "double"]: false,
    }));
  };

  const handleDartThrow = (score: number): void => {
    if (matchRound.length >= THROWS_PER_ROUND) return;

    const roundData: DartThrow = {
      dartboardZone: score,
      score: applyScoreMultiplier(
        scoreMultiplier.double,
        scoreMultiplier.triple,
        score
      ),
      isBullseye: score === SCORE_BULLSEYE,
      isDouble: isNonMultipleScore(score) ? false : scoreMultiplier.double,
      isTriple: isNonMultipleScore(score) ? false : scoreMultiplier.triple,
      isMissed: score === SCORE_MISSED,
      isOuterBull: score === SCORE_OUTER_BULL,
    };

    setScoreMultiplier({
      double: false,
      triple: false,
    });
    setMatchRound((prevRounds) => [...prevRounds, roundData]);
  };

  const handleRemoveLastThrow = (): void => {
    if (matchRound.length === 0) return;

    const updatedRounds = matchRound.slice(0, -1);

    setMatchRound(updatedRounds);
  };

  const isLastThrowCheckout = (
    checkout: Checkout,
    scoreLeft: number,
    throwedScore: number
  ): boolean => {
    if (matchRound.length === 0) {
      // Can't win without a throw
      return false;
    }

    if (scoreLeft - throwedScore !== 0) {
      // Remaining score was not 0!
      return false;
    }

    const lastThrow = matchRound[matchRound.length - 1];

    if (!lastThrow) {
      // Just an additional safeguard, should not occur due to previous checks
      return false;
    }

    if (checkout === "Double") {
      return lastThrow.isDouble || lastThrow.isBullseye;
    }

    if (checkout === "Triple") {
      return lastThrow.isTriple;
    }

    // If checkout type is "Any" or not specified
    return true;
  };

  const handleRoundUpdate = (): void => {
    if (matchRound.length > THROWS_PER_ROUND) return;

    const { matchCheckout: checkout } = matchSessionData;

    const currentPlayer = players[currentPlayerIndex];

    const isWinner = isLastThrowCheckout(
      checkout,
      currentPlayer.scoreLeft,
      totalRoundScore
    );

    const emptyRoundData: DartThrow = {
      dartboardZone: 0,
      isBullseye: false,
      isDouble: false,
      isMissed: true,
      isOuterBull: false,
      isTriple: false,
      score: 0,
    };

    const filledThrowDetails = [
      ...matchRound,
      ...Array.from(
        { length: THROWS_PER_ROUND - matchRound.length },
        () => emptyRoundData
      ),
    ];

    const newScoreLeft = currentPlayer.scoreLeft - totalRoundScore;

    const updatedMatchRound: MatchRound = {
      elapsedTime: 0, // TODO: Currently set to 0, will be implemented later
      isBust: newScoreLeft < 0 ? true : false,
      roundAverage:
        matchRound.length > 0 ? totalRoundScore / matchRound.length : 0,
      roundTotal: totalRoundScore,

      throwDetails:
        isWinner && newScoreLeft === 0
          ? matchRound
          : filledThrowDetails.slice(0, THROWS_PER_ROUND),
    };

    const updatedCurrentPlayer: Player = {
      ...currentPlayer,
      rounds: [...currentPlayer.rounds, updatedMatchRound],
      isWinner: isWinner,

      scoreLeft:
        isWinner && newScoreLeft === 0
          ? 0
          : newScoreLeft > 0
          ? newScoreLeft
          : currentPlayer.scoreLeft,
    };

    // Update the players array with the updated current player data
    const updatedPlayers = players.map((player, index) =>
      index === currentPlayerIndex ? updatedCurrentPlayer : player
    );

    playersActions.setState(updatedPlayers);

    // Update the match session data with the updated players array
    setMatchSessionData({
      ...matchSessionData,
      matchStatus: isWinner ? "finished" : "started",
      players: updatedPlayers,
    });

    handleUpdateCurrentPlayerIndex();
    setMatchRound([]);
  };

  // Function to find the highest score across all rounds
  const getMatchHighestScore = (matchRounds: MatchRound[]): number => {
    let highestScore = 0;

    // Iterate through each MatchRound
    matchRounds.forEach((matchRound) => {
      // Iterate through each DartThrow in throwDetails of the current MatchRound

      if (matchRound.roundTotal > highestScore) {
        highestScore = matchRound.roundTotal;
      }
    });

    return highestScore;
  };

  return (
    <OnlyControlsLayout>
      <Grid gutter={0}>
        <Grid.Col span={{ md: 8, xl: 9 }}>
          <Grid gutter={0}>
            {players.map((player, _idx) => {
              const progressValue =
                (player.scoreLeft / matchSessionData.initialScore) * 100;
              return (
                <Grid.Col
                  span={{
                    md: 6,
                    xl: 4,
                  }}
                  key={player.uuid}
                >
                  <Card
                    radius={0}
                    px={0}
                    pb={0}
                    m="lg"
                    bg={
                      _idx === currentPlayerIndex
                        ? darken(getThemeColor(player.color, theme), 0.7) // TODO: Add better support for light-mode
                        : undefined
                    }
                  >
                    {player.isWinner ? (
                      <Tooltip
                        label={`${player.username} won the match!`}
                        withArrow
                      >
                        <IconCrown
                          style={{
                            position: "absolute",
                            right: 16,
                            top: 16,
                          }}
                          color="gold"
                          size={32}
                        />
                      </Tooltip>
                    ) : undefined}

                    <Stack>
                      <Group px="lg">
                        <ProfileAvatar size="lg" profile={player} />
                        <Stack align="start" gap={0}>
                          <Text opacity={0.6} fz="xs">
                            {renderName(player.name)}
                          </Text>
                          <Text fz="h2" fw="bold">
                            {player.username}
                          </Text>
                        </Stack>
                      </Group>

                      <Stack gap={0} ta="center">
                        <Text
                          c={player.color}
                          fw="bold"
                          px="lg"
                          fz={{ md: rem(40), lg: rem(60), xl: rem(100) }}
                        >
                          <NumberFormatter value={player.scoreLeft} />
                        </Text>
                        <Tooltip label={t("stats.avg")} withArrow>
                          <Text
                            fz="lg"
                            style={{
                              cursor: "help",
                            }}
                          >
                            <NumberFormatter
                              decimalScale={2}
                              value={getTotalMatchAvg(players[_idx].rounds)}
                            />
                          </Text>
                        </Tooltip>
                      </Stack>
                      <Divider
                        label={t("common:routes.statistics")}
                        color={
                          _idx === currentPlayerIndex ? player.color : undefined
                        }
                      />
                      <Flex
                        direction={{
                          xs: "column",
                          xl: "row",
                        }}
                        tt="uppercase"
                        fz="xs"
                        px="lg"
                        opacity={0.7}
                        justify="space-between"
                      >
                        {/* TODO: Calc first nine average... */}
                        <span>First 9 Average: 0</span>
                        <span>
                          Highest Score:{" "}
                          <NumberFormatter
                            defaultValue={0}
                            value={getMatchHighestScore(players[_idx].rounds)}
                          />
                        </span>
                        <span>
                          Darts Throws:{" "}
                          {/* TODO: Lazy way... Not handling 1 or 2 dart inputs */}
                          {players[_idx].rounds.length * THROWS_PER_ROUND}
                        </span>
                      </Flex>
                      <Progress
                        color={player.color}
                        radius={0}
                        value={progressValue}
                      />
                    </Stack>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        </Grid.Col>
        <Grid.Col component="aside" span="auto" p="lg">
          <Stack gap="sm">
            <SimpleGrid
              cols={{
                xs: 4,
                lg: 3,
              }}
            >
              {DARTBOARD_ZONES.map((zone) => (
                <Button
                  onClick={() => handleDartThrow(zone)}
                  variant="default"
                  key={zone}
                >
                  {zone}
                </Button>
              ))}
            </SimpleGrid>
            <Text
              fz={{ md: rem(40), lg: rem(40), xl: rem(80) }}
              ta="center"
              fw="bold"
            >
              <NumberFormatter value={totalRoundScore} />
            </Text>
            <Group justify="center" fz="h3" opacity={0.5}>
              {Array.from({ length: THROWS_PER_ROUND }, (_, _idx) => (
                <Text fz="xl" key={_idx}>
                  {matchRound[_idx]?.isDouble
                    ? "D"
                    : matchRound[_idx]?.isTriple
                    ? "T"
                    : undefined}
                  {matchRound[_idx]?.dartboardZone ?? "-"}
                </Text>
              ))}
            </Group>
            <SimpleGrid cols={3}>
              <Button
                onClick={() => handleMultiplierToggle("double")}
                variant={scoreMultiplier.double ? undefined : "default"}
              >
                Double
              </Button>
              <Button
                onClick={() => handleMultiplierToggle("triple")}
                variant={scoreMultiplier.triple ? undefined : "default"}
              >
                Triple
              </Button>
              <Tooltip label={t("removeThrows")} withArrow>
                <Button
                  disabled={matchRound.length === 0}
                  onClick={() => handleRemoveLastThrow()}
                  variant="default"
                >
                  <IconEraser />
                </Button>
              </Tooltip>
            </SimpleGrid>
            <Button
              disabled={matchSessionData.matchStatus === "finished"}
              onClick={() => handleRoundUpdate()}
            >
              Next Player
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </OnlyControlsLayout>
  );
};

export default PlayingPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

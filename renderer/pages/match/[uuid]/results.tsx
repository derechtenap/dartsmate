import type { NextPage } from "next";
import DefaultLayout, { navbarWidth } from "@/components/layouts/Default";
import {
  Badge,
  Container,
  Group,
  NumberFormatter,
  ScrollArea,
  Table,
  Tabs,
  Text,
  Tooltip,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useCurrentMatch } from "hooks/useCurrentMatch";
import type { UUID } from "crypto";
import PageHeader from "@/components/content/PageHeader";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import { getTotalMatchAvg } from "utils/match/getTotalMatchAvg";
import {
  IconHistory,
  IconRepeat,
  IconTable,
  IconTrophy,
} from "@tabler/icons-react";
import { getHighestRoundScoreForPlayer } from "utils/match/getHighestRoundScorePlayer";
import { getRoundsAboveThreshold } from "utils/match/getRoundsAboveThreshold";

const GameResultsPage: NextPage = () => {
  const router = useRouter();
  const matchQueryUuid = router.query.uuid;
  const {
    isFetching,
    isLoading,
    isSuccess,
    data: matchData,
  } = useCurrentMatch(matchQueryUuid as UUID);

  const tabIconSize = "18px";

  return (
    <DefaultLayout
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <ScrollArea.Autosize ml={navbarWidth + 1}>
        <Container w={900}>
          <PageHeader title="Results">
            {`${matchData?.players.length || 0} Players - ${
              matchData?.initialScore || 0
            } ${matchData?.matchCheckout || "Any"}-Out`}
          </PageHeader>

          <Tabs defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab
                leftSection={<IconTable size={tabIconSize} />}
                value="overview"
              >
                Overview
              </Tabs.Tab>
              <Tabs.Tab
                leftSection={<IconHistory size={tabIconSize} />}
                value="details"
              >
                Round Details
              </Tabs.Tab>
              <Tabs.Tab
                leftSection={<IconRepeat size={tabIconSize} />}
                value="matchReplay"
              >
                Match Replay
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview">
              <Table
                captionSide="top"
                highlightOnHover
                mt="lg"
                stickyHeader
                striped
                withColumnBorders
              >
                <Table.Caption tt="uppercase" fz="xs">
                  Set: 1 - Leg: 1
                </Table.Caption>
                <Table.Thead>
                  <Table.Tr fz="xs" tt="uppercase">
                    <Table.Th>Player</Table.Th>
                    <Table.Th>Darts</Table.Th>
                    <Table.Th>First 9 Avg.</Table.Th>
                    <Table.Th>Average</Table.Th>
                    <Table.Th>Highest Score</Table.Th>
                    <Table.Th>100+</Table.Th>
                    <Table.Th>180</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {matchData?.players.map((player) => (
                    <Table.Tr key={player.uuid}>
                      <Table.Td>
                        <Group>
                          <ProfileAvatar profile={player} />
                          <Group>
                            {player.isWinner ? (
                              <IconTrophy color="gold" />
                            ) : undefined}
                            {player.username}
                          </Group>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        {player.rounds.reduce(
                          (total, round) => total + round.throwDetails.length,
                          0
                        )}
                      </Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          decimalScale={2}
                          value={
                            (player.rounds[0].roundAverage +
                              player.rounds[1].roundAverage +
                              player.rounds[2].roundAverage) /
                            3
                          }
                        />
                      </Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          decimalScale={2}
                          value={getTotalMatchAvg(player.rounds)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          decimalScale={0}
                          value={getHighestRoundScoreForPlayer(player)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          decimalScale={0}
                          value={getRoundsAboveThreshold(player, 100)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          decimalScale={0}
                          value={getRoundsAboveThreshold(player, 180)}
                        />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="details">
              <Tabs
                orientation="vertical"
                defaultValue={matchData?.players[0].uuid}
              >
                <Tabs.List mt="lg">
                  {matchData?.players.map((player) => (
                    <Tabs.Tab
                      key={player.uuid}
                      value={player.uuid}
                      leftSection={<ProfileAvatar profile={player} size="sm" />}
                    >
                      {player.username}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>

                {matchData?.players.map((player, _idx) => (
                  <Tabs.Panel key={player.uuid} value={player.uuid} pl="lg">
                    <Table
                      captionSide="top"
                      highlightOnHover
                      mt="lg"
                      stickyHeader
                      striped
                      withColumnBorders
                    >
                      <Table.Caption tt="uppercase" fz="xs">
                        Set: 1 - Leg: 1
                      </Table.Caption>
                      <Table.Thead>
                        <Table.Tr fz="xs" tt="uppercase">
                          <Table.Th>Round</Table.Th>
                          <Table.Th>Score</Table.Th>
                          <Table.Th>Round AVG</Table.Th>
                          <Table.Th>Throws</Table.Th>
                          <Table.Th>Round Time</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {matchData.players[_idx].rounds.map((round, _idx) => (
                          <Table.Tr key={_idx}>
                            <Table.Td>{_idx + 1}</Table.Td>
                            <Table.Td>{round.roundTotal}</Table.Td>
                            <Table.Td>
                              <NumberFormatter
                                decimalScale={2}
                                value={round.roundAverage}
                              />
                            </Table.Td>
                            <Table.Td>
                              <Group align="center" grow>
                                {round.throwDetails.map((roundThrow, _idx) => (
                                  <Tooltip
                                    key={_idx}
                                    label={`Score ${roundThrow.score}`}
                                  >
                                    <Badge
                                      variant="filled"
                                      style={{ cursor: "help" }}
                                    >
                                      {roundThrow.isDouble
                                        ? `D${roundThrow.dartboardZone}`
                                        : roundThrow.isTriple
                                        ? `T${roundThrow.dartboardZone}`
                                        : roundThrow.dartboardZone}
                                    </Badge>
                                  </Tooltip>
                                ))}
                              </Group>
                            </Table.Td>
                            <Table.Td>{round.elapsedTime} Seconds</Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </Tabs.Panel>
                ))}
              </Tabs>
            </Tabs.Panel>

            <Tabs.Panel value="matchReplay">
              {/* TODO: Add Match Replay Page */}
              <Text mt="lg">This feature will be added in a later update!</Text>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </ScrollArea.Autosize>
    </DefaultLayout>
  );
};

export default GameResultsPage;

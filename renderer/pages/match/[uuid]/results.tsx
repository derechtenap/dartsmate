import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import { Badge, Card, Group, Table, Tabs, Text, Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
import { useCurrentMatch } from "hooks/useCurrentMatch";
import type { UUID } from "crypto";
import PageHeader from "@/components/content/PageHeader";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import { getTotalMatchAvg } from "utils/match/getTotalMatchAvg";
import {
  IconCrown,
  IconHistory,
  IconRepeat,
  IconTable,
} from "@tabler/icons-react";

const GameResultsPage: NextPage = () => {
  const router = useRouter();
  const matchQueryUuid = router.query.uuid;
  const {
    isFetching,
    isLoading,
    isSuccess,
    data: matchData,
  } = useCurrentMatch(matchQueryUuid as UUID);

  return (
    <DefaultLayout
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <PageHeader title="Results">
        <Group position="apart">
          <Text>
            {`${matchData?.players.length || 0} Players - ${
              matchData?.initialScore || 0
            } ${matchData?.matchCheckout || "Any"}-Out`}
          </Text>
          <Badge color={matchData?.matchStatus === "finished" ? "blue" : "red"}>
            Status: {matchData?.matchStatus}
          </Badge>
        </Group>
      </PageHeader>

      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview" icon={<IconTable size="0.8rem" />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="details" icon={<IconHistory size="0.8rem" />}>
            Round Details
          </Tabs.Tab>
          <Tabs.Tab value="matchReplay" icon={<IconRepeat size="0.8rem" />}>
            Match Replay
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="lg">
          <Table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Score Left</th>
                <th>Rounds</th>
                <th>Darts</th>
                <th>AVG</th>
              </tr>
            </thead>
            <tbody>
              {matchData?.players.map((player) => (
                <tr key={player.uuid}>
                  <td>
                    <Group>
                      <ProfileAvatar profile={player} />
                      <Group>
                        {player.isWinner ? (
                          <Tooltip label={`${player.username} won the match!`}>
                            <IconCrown
                              color="gold"
                              style={{ cursor: "help" }}
                            />
                          </Tooltip>
                        ) : undefined}
                        {player.username}
                      </Group>
                    </Group>
                  </td>
                  <td>{player.scoreLeft}</td> <td>{player.rounds.length}</td>
                  <td>
                    {player.rounds.reduce(
                      (total, round) => total + round.throwDetails.length,
                      0
                    )}
                  </td>
                  <td>{getTotalMatchAvg(player.rounds)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="details" pt="lg">
          <Tabs
            orientation="vertical"
            defaultValue={matchData?.players[0].uuid}
          >
            <Tabs.List>
              {matchData?.players.map((player) => (
                <Tabs.Tab
                  key={player.uuid}
                  value={player.uuid}
                  icon={<ProfileAvatar profile={player} size="sm" />}
                >
                  {player.username}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {matchData?.players.map((player, _idx) => (
              <Tabs.Panel key={player.uuid} value={player.uuid} pl="lg">
                <Card>
                  <Table>
                    <thead>
                      <tr>
                        <th>Round</th>
                        <th>Score</th>
                        <th>Round AVG</th>
                        <th>Throws</th>
                        <th>Round Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchData.players[_idx].rounds.map((round, _idx) => (
                        <tr key={_idx}>
                          <td>{_idx + 1}</td>
                          <td>{round.roundTotal}</td>
                          <td>{round.roundAverage.toFixed(2)}</td>
                          <td>
                            <Group align="center" grow>
                              {round.throwDetails.map((roundThrow, _idx) => (
                                <Tooltip
                                  key={_idx}
                                  label={`Score ${roundThrow.score}`}
                                >
                                  <Badge
                                    color="blue"
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
                          </td>
                          <td>{round.elapsedTime} Seconds</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Tabs.Panel>
            ))}
          </Tabs>
        </Tabs.Panel>

        <Tabs.Panel value="matchReplay" pt="lg">
          {/* TODO: Add Match Replay Page */}
        </Tabs.Panel>
      </Tabs>
    </DefaultLayout>
  );
};

export default GameResultsPage;

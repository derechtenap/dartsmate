import ProfileAvatar from "@/components/content/ProfileAvatar";
import DefaultLayout from "@/components/layouts/Default";
import {
  Group,
  NumberFormatter,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import {
  IconChartHistogram,
  IconCrown,
  IconListNumbers,
  IconUsers,
} from "@tabler/icons-react";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { Match } from "types/match";
import getHighestScore from "utils/match/stats/getHighestScore";
import getNumberOfRoundsAboveThreshold from "utils/match/stats/getScoresAbove";
import { getTotalMatchAvg } from "utils/match/stats/getTotalMatchAvg";
import { getLocaleDate } from "utils/misc/getLocalDate";
import { DonutChart, type DonutChartCell, LineChart } from "@mantine/charts";
import getCategorizedThrows from "utils/match/stats/getCategorizedThrows";
const ViewMatchPage: NextPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  const [matchData] = useSessionStorage<Match>({
    key: "currentMatch",
    defaultValue: undefined,
  });

  if (!matchData) {
    return <DefaultLayout withNavbarOpen>Missing Match Data</DefaultLayout>;
  }

  const renderTableRows = matchData.players
    .sort((a, b) => a.scoreLeft - b.scoreLeft)
    .map((player, _idx) => (
      <Table.Tr key={player.uuid}>
        <Table.Td ta="center">
          {_idx === 0 ? (
            <Tooltip
              label={t("match:playerWon", {
                PLAYER_NAME: player.username,
              })}
              withArrow
            >
              <IconCrown color="gold" />
            </Tooltip>
          ) : (
            `${_idx + 1}.`
          )}
        </Table.Td>
        <Table.Td>
          <Group>
            <ProfileAvatar profile={player} />
            {player.username}
          </Group>
        </Table.Td>
        <Table.Td>{player.scoreLeft}</Table.Td>
        <Table.Td>
          <NumberFormatter
            decimalScale={2}
            value={getTotalMatchAvg(player.rounds)}
          />
        </Table.Td>
        <Table.Td>
          <NumberFormatter value={getHighestScore(player.rounds)} />
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            value={getNumberOfRoundsAboveThreshold(player.rounds, 180)}
          />
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            value={getNumberOfRoundsAboveThreshold(player.rounds, 120)}
          />
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            value={getNumberOfRoundsAboveThreshold(player.rounds, 100)}
          />
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            value={getNumberOfRoundsAboveThreshold(player.rounds, 80)}
          />
        </Table.Td>
      </Table.Tr>
    ));

  // Initialize data with the initial scores
  const data = [
    {
      round: "Start",
      ...matchData.players.reduce((acc, player) => {
        acc[player.username] = matchData.initialScore;
        return acc;
      }, {}),
    },
  ];

  // TODO: FIX BUG WHEN PLAYER WAS BUSTED IN ONE OR MORE ROUNDS AND GET NEGATIVE CHART SCORE VALUES
  // Append rounds data
  matchData.players[0].rounds.forEach((_, roundIndex) => {
    const roundData = { round: `Round ${roundIndex + 1}` };
    matchData.players.forEach((player) => {
      // Start with the initial score
      let scoreLeft = matchData.initialScore;
      // Subtract the total of each round up to the current round
      player.rounds.slice(0, roundIndex + 1).forEach((round) => {
        scoreLeft -= round.roundTotal;
      });
      roundData[player.username] = scoreLeft;
    });
    data.push(roundData);
  });

  return (
    <DefaultLayout withNavbarOpen>
      <Title>Match Results</Title>
      <Text opacity={0.8}>{getLocaleDate(matchData.createdAt)}</Text>
      <Tabs defaultValue="result">
        <Tabs.List>
          <Tabs.Tab leftSection={<IconListNumbers />} value="result">
            {t("tabs.title.result")}
          </Tabs.Tab>
          <Tabs.Tab leftSection={<IconChartHistogram />} value="charts">
            {t("tabs.title.charts")}
          </Tabs.Tab>
          <Tabs.Tab leftSection={<IconUsers />} value="playerStats">
            {t("tabs.title.playerStats")}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="result">
          <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th ta="center">#</Table.Th>
                <Table.Th>{t("lobby:title.players")}</Table.Th>
                <Table.Th>{t("stats.scoreLeft")}</Table.Th>
                <Table.Th>{t("stats.avg")}</Table.Th>
                <Table.Th>{t("stats.highestScore")}</Table.Th>
                <Table.Th>{t("stats.180s")}</Table.Th>
                <Table.Th>120+</Table.Th>
                <Table.Th>100+</Table.Th>
                <Table.Th>80+</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{renderTableRows}</Table.Tbody>
          </Table>
        </Tabs.Panel>
        <Tabs.Panel value="charts">
          <Title>{t("chartTitle.gameProgression")}</Title>
          <LineChart
            p="lg"
            h={500}
            data={data}
            dataKey="round"
            series={matchData.players.map((player) => ({
              name: player.username,
              color: player.color,
            }))}
            curveType="step"
            withLegend
            legendProps={{ verticalAlign: "bottom", height: 50 }}
            xAxisLabel="Round"
            yAxisLabel="Score"
            yAxisProps={{
              domain: [0, matchData.initialScore], // Set Chart y axis min/max value
            }}
          />
        </Tabs.Panel>
        <Tabs.Panel value="playerStats">
          <Tabs defaultValue={matchData.players[0].uuid} orientation="vertical">
            <Tabs.List>
              {matchData.players.map((player) => (
                <Tabs.Tab key={player.uuid} value={player.uuid}>
                  {player.username}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {matchData.players.map((player) => {
              const categorizedThrows = getCategorizedThrows(player.rounds);

              // Prepare data array for DonutChart
              const data: DonutChartCell[] = [
                {
                  color: "blue",
                  name: "Doubles",
                  value: categorizedThrows.doubles,
                },
                {
                  color: "green",
                  name: "Triples",
                  value: categorizedThrows.triples,
                },
                {
                  color: "yellow",
                  name: "Singles",
                  value: categorizedThrows.normals,
                },
                {
                  color: "red",
                  name: "Missed",
                  value: categorizedThrows.missed,
                },
                // Add more categories as needed
              ];

              return (
                <Tabs.Panel key={player.uuid} value={player.uuid}>
                  <Group gap="xl">
                    <DonutChart data={data} chartLabel="" withTooltip={false} />
                    <Stack>
                      {data.map((d) => (
                        <Text key={d.name}>
                          {d.name}: {d.value}
                        </Text>
                      ))}
                    </Stack>
                  </Group>
                </Tabs.Panel>
              );
            })}
          </Tabs>
        </Tabs.Panel>
      </Tabs>
    </DefaultLayout>
  );
};

export default ViewMatchPage;

export const getStaticProps = makeStaticProperties([
  "common",
  "lobby",
  "match",
]);

export { getStaticPaths };

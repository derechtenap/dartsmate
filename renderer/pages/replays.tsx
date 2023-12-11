import BadgeMatchStatus from "@/components/content/BadgeMatchStatus";
import PageHeader from "@/components/content/PageHeader";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Avatar,
  // Card,
  // Group,
  // Paper,
  ScrollArea,
  Table,
  Tooltip,
} from "@mantine/core";
import {
  /* IconArrowsSort, IconTrash, */ IconZoomIn,
} from "@tabler/icons-react";
import { useMatches } from "hooks/useMatches";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getLocaleDate } from "utils/misc/getLocalDate";

const ReplaysPage: NextPage = () => {
  const { data: matches, isFetching, isLoading, isSuccess } = useMatches();
  const router = useRouter();

  /*
  const tableControls = [
    {
      label: "Sort Matches",
      icon: <IconArrowsSort />,
    },
    {
      label: "Delete Matches",
      icon: <IconTrash />,
    },
  ];
  */

  const sortedMatchDataByNewest = matches.sort(
    (a, b) => b.createdAt - a.createdAt
  ); // Sort by newest

  return (
    <DefaultLayout
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <PageHeader title="Replays">{""}</PageHeader>
      {/*
      <Paper
        py="xs"
        withBorder
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <Card.Section px="sm">
          <Group position="apart">
            {tableControls.map((control) => (
              <Tooltip
                label={control.label}
                position="top-start"
                key={control.label}
                withArrow
                transitionProps={{ transition: "pop", duration: 300 }}
              >
                <ActionIcon>{control.icon}</ActionIcon>
              </Tooltip>
            ))}
          </Group>
        </Card.Section>
      </Paper>
      */}
      <ScrollArea.Autosize placeholder="">
        <Table highlightOnHover withBorder>
          <thead>
            <tr>
              <th>Match</th>
              <th>Played</th>
              <th>Players</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedMatchDataByNewest.map((match) => (
              <tr key={match.matchUUID}>
                <td>
                  {match.initialScore} {match.matchCheckout}-Out
                </td>
                <td>{getLocaleDate(match.createdAt)}</td>
                <td>
                  <Avatar.Group>
                    {match.players.map((player) => (
                      <ProfileAvatar
                        size="sm"
                        key={player.uuid}
                        profile={player}
                      />
                    ))}
                  </Avatar.Group>
                </td>
                <td>
                  <BadgeMatchStatus matchStatus={match.matchStatus} />
                </td>
                <td>
                  <Tooltip label="View Results">
                    <ActionIcon
                      aria-label="View Results"
                      onClick={() =>
                        void router.push(`/match/${match.matchUUID}/results/`)
                      }
                    >
                      <IconZoomIn />
                    </ActionIcon>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea.Autosize>
    </DefaultLayout>
  );
};

export default ReplaysPage;

import EmptyState from "@/components/content/EmptyState";
import DefaultLayout, { navbarWidth } from "@/components/layouts/Default";
import {
  ActionIcon,
  Avatar,
  Group,
  ScrollArea,
  Table,
  Tooltip,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useMatches } from "hooks/useMatches";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Player } from "types/match";
import { getLocaleDate } from "utils/misc/getLocalDate";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";

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

  if (matches.length === 0) {
    return (
      <DefaultLayout
        isFetching={isFetching}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <EmptyState text="We were unable to load matches. Have you already played a match?" />
      </DefaultLayout>
    );
  }

  const isMultiplePlayers = (players: Player[]) => {
    return players.length === 1;
  };

  const rows = sortedMatchDataByNewest.map((row) => (
    <Table.Tr key={row.matchUUID}>
      <Table.Td>
        {`${row.players.length} ${
          isMultiplePlayers(row.players) ? "Player" : "Players"
        } - ${row.initialScore}-${row.matchCheckout}-Out`}
      </Table.Td>
      <Table.Td>{getLocaleDate(row.createdAt)}</Table.Td>
      <Table.Td>
        <Avatar.Group>
          {row.players.map((player) => (
            <Avatar color={player.color} key={player.uuid} size="sm">
              {getUsernameInitials(player.username)}
            </Avatar>
          ))}
        </Avatar.Group>
      </Table.Td>
      <Table.Td>
        <Group>
          <Tooltip label="View match">
            <ActionIcon
              aria-label="View Match"
              onClick={() =>
                void router.push(`/match/${row.matchUUID}/results/`)
              }
              variant="default"
            >
              <IconSearch width="75%" height="75%" />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <DefaultLayout
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <ScrollArea.Autosize ml={navbarWidth + 1}>
        <Table w={1000} mx="auto">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Match</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Players</Table.Th>
              <Table.Th>{/* Table actions */}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea.Autosize>
    </DefaultLayout>
  );
};

export default ReplaysPage;

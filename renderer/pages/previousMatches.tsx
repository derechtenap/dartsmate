import PageHeader from "@/components/content/PageHeader";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  ScrollArea,
  Table,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { /* IconTrash ,*/ IconZoomIn } from "@tabler/icons-react";
import { useMatches } from "hooks/useMatches";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getLocaleDate } from "utils/misc/getLocalDate";
import pkg from "../../package.json";

const PreviousMatchesPage: NextPage = () => {
  const { data: matches, isFetching, isLoading, isSuccess } = useMatches();
  const router = useRouter();

  const sortedMatchDataByNewest = matches.sort(
    (a, b) => b.createdAt - a.createdAt
  ); // Sort by newest

  return (
    <DefaultLayout
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <PageHeader title="Previous Matches">
        {pkg.productName} found {matches.length}{" "}
        {matches.length === 1 ? "Match" : "Matches"} on your device.
      </PageHeader>
      <ScrollArea.Autosize h="80vh">
        <Card>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Match</th>
                <th>Players</th>
                <th>Winner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedMatchDataByNewest.map((match) => (
                <tr key={match.matchUUID}>
                  <td>{getLocaleDate(match.createdAt)}</td>
                  <td>
                    {match.initialScore} {match.matchCheckout}-Out
                  </td>
                  <td>
                    <Avatar.Group>
                      {match.players.map((player) => (
                        <ProfileAvatar
                          key={player.uuid}
                          profile={player}
                          size="sm"
                        />
                      ))}
                    </Avatar.Group>
                  </td>
                  <td>
                    {match.players.map((player) => (
                      <>
                        {player.isWinner ? (
                          <ProfileAvatar profile={player} size="sm" />
                        ) : null}
                      </>
                    ))}
                  </td>
                  <td>
                    <Group>
                      <UnstyledButton
                        onClick={() =>
                          void router.push(`match/${match.matchUUID}/results`)
                        }
                      >
                        <Tooltip label="View Results">
                          <ActionIcon size="sm">
                            <IconZoomIn />
                          </ActionIcon>
                        </Tooltip>
                      </UnstyledButton>
                      {/*
                      <UnstyledButton
                        onClick={() =>
                          void router.push(`match/${match.matchUUID}/results`)
                        }
                      >
                        <Tooltip label="Delete Match">
                          <ActionIcon size="sm" color="red">
                            <IconTrash />
                          </ActionIcon>
                        </Tooltip>
                      </UnstyledButton>
                      */}
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </ScrollArea.Autosize>
    </DefaultLayout>
  );
};

export default PreviousMatchesPage;

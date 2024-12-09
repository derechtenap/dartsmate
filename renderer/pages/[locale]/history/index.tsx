import { useTranslation } from "next-i18next";

import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout, { headerHeight } from "@/components/layouts/Default";
import getAllMatchesFromDatabase from "@/lib/db/matches/getAllMatches";
import { useEffect, useState } from "react";
import type { Match } from "types/match";
import {
  ActionIcon,
  ActionIconGroup,
  AvatarGroup,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { getLocaleDate } from "utils/misc/getLocalDate";
import { modals } from "@mantine/modals";
import deleteMatchFromDatabase from "@/lib/db/matches/deleteMatch";
import { notifications } from "@mantine/notifications";
import { useSessionStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

const HistoryPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  const [matches, setMatches] = useState<Match[] | undefined>(undefined);

  const [, setMatchStorage] = useSessionStorage<Match | undefined>({
    key: "currentMatch",
    defaultValue: undefined,
  });

  const router = useRouter();

  useEffect(() => {
    const getMatches = async () =>
      getAllMatchesFromDatabase().then((matches) => {
        setMatches(matches);
      });

    void getMatches();
  }, []);

  const handleDeleteMatch = (uuid: Match["uuid"]) => {
    modals.openConfirmModal({
      title: t("match:modalDeleteMatch:title"),
      centered: true,
      children: <Text size="sm">{t("match:modalDeleteMatch:text")}</Text>,
      labels: {
        confirm: t("match:deleteMatch"),
        cancel: t("match:modalDeleteMatch:cancelButton"),
      },
      overlayProps: {
        backgroundOpacity: 0.75,
        blur: 3,
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        void deleteMatchFromDatabase(uuid).then(() => {
          setMatches((prev) => prev?.filter((match) => match.uuid !== uuid));
          notifications.show({
            title: "Match deleted!",
            message: `Deleted match with uuid ${uuid}`,
          });
        });
      },
    });
  };

  const handleOpenMatch = (match: Match) => {
    setMatchStorage(match);
    void router.push(`/${locale}/match/view`);
  };

  const rows = matches?.map((match) => (
    <Table.Tr key={match.uuid}>
      <Table.Td>{getLocaleDate(match.createdAt)}</Table.Td>
      <Table.Td>
        {match.initialScore} {match.matchCheckout}-Out &ndash;{" "}
        {match.players.length}{" "}
        {match.players.length === 1 ? "Player" : "Players"}
      </Table.Td>
      <Table.Td>
        <AvatarGroup>
          {match.players.map((player) => (
            <ProfileAvatar profile={player} />
          ))}
        </AvatarGroup>
      </Table.Td>
      <Table.Td>{match.matchStatus}</Table.Td>
      <Table.Td>
        <ActionIconGroup>
          <ActionIcon>
            <IconSearch onClick={() => handleOpenMatch(match)} />
          </ActionIcon>
          <ActionIcon bg="dark">
            <IconTrash onClick={() => handleDeleteMatch(match.uuid)} />
          </ActionIcon>
        </ActionIconGroup>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <DefaultLayout withNavbarOpen>
      <Stack>
        <Title>{t("routes.history")}</Title>
        {matches ? (
          <Table
            horizontalSpacing="sm"
            highlightOnHover
            stickyHeader
            stickyHeaderOffset={headerHeight}
            withTableBorder
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("matchDate")}</Table.Th>
                <Table.Th>{t("match")}</Table.Th>
                <Table.Th>{t("players")}</Table.Th>
                <Table.Th>{t("matchStatus")}</Table.Th>
                <Table.Th>{/* Actions */}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        ) : (
          <>NO MATCHES</>
        )}
      </Stack>
    </DefaultLayout>
  );
};

export default HistoryPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

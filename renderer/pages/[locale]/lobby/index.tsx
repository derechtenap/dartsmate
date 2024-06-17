import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "../../../lib/get-static";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Button,
  Drawer,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import type { Profile } from "types/profile";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import { useDisclosure, useListState, useSessionStorage } from "@mantine/hooks";
import { IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { Match } from "types/match";
import { APP_VERSION } from "utils/constants";
import { v4 as uuidv4 } from "uuid";
import getFormattedName from "utils/misc/getFormattedName";

const NewGamePage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const [selectedProfiles, selectedProfilesActions] = useListState<Profile>([]);
  const [availableProfiles, availableProfilesActions] = useListState<Profile>(
    []
  );

  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();

  useEffect(() => {
    // Reset profiles since they will refetch each render
    selectedProfilesActions.setState([]);
    availableProfilesActions.setState([]);

    void window.ipc
      .getDefaultProfile()
      .then((profile: Profile) => availableProfilesActions.append(profile));

    void window.ipc.getGuestProfiles().then((profiles: Profile[]) => {
      profiles.forEach((profile) => {
        availableProfilesActions.append(profile);
      });
    });
  }, []);

  const matchUUID = uuidv4();

  // const [matchStorage, setMatchStorage] = useSessionStorage<Match>({
  const [, setMatchStorage] = useSessionStorage<Match>({
    key: "currentMatch",
    defaultValue: undefined,
  });

  const matchSettings = useForm<Match>({
    initialValues: {
      appVersion: APP_VERSION,
      createdAt: Date.now(),
      initialScore: 501,
      matchCheckout: "Double",
      matchStatus: "started",
      matchUUID: matchUUID,
      players: [],
      updatedAt: Date.now(),
    },
  });

  const handleRemovePlayer = (uuid: Profile["uuid"]): void => {
    const updatedProfiles = selectedProfiles.filter(
      (profile) => profile.uuid !== uuid
    );
    selectedProfilesActions.setState(updatedProfiles);

    matchSettings.setValues({
      players: updatedProfiles.map((profile) => ({
        ...profile,
        scoreLeft: -1,
        isWinner: false,
        rounds: [],
      })),
    });
  };

  const handleAddPlayer = (profile: Profile): void => {
    selectedProfilesActions.append(profile);
    const updatedProfiles = [...selectedProfiles, profile];

    matchSettings.setValues({
      players: updatedProfiles.map((profile) => ({
        ...profile,
        scoreLeft: -1,
        isWinner: false,
        rounds: [],
      })),
    });
  };

  const handleStartMatch = (): void => {
    if (!matchSettings.isValid()) return;

    setMatchStorage(matchSettings.values);
    void router.push(`/${locale}/match/playing`);
  };

  const renderPlayer = (profile: Profile): JSX.Element => {
    return (
      <Group justify="space-between">
        <Group>
          <ProfileAvatar
            profile={profile}
            src={profile.avatarImage}
            size="lg"
          />
          <Text>
            {getFormattedName(profile.name)}{" "}
            <Text component="span" c="dimmed" display="block" size="xs">
              {profile.username}
            </Text>
          </Text>
        </Group>
        {selectedProfiles.includes(profile) ? (
          <ActionIcon
            onClick={() => handleRemovePlayer(profile.uuid)}
            disabled={false}
            variant="default"
          >
            <IconUserMinus
              style={{
                height: rem(18),
                width: rem(18),
              }}
            />
          </ActionIcon>
        ) : (
          <ActionIcon
            onClick={() => handleAddPlayer(profile)}
            disabled={false}
            variant="default"
          >
            <IconUserPlus
              style={{
                height: rem(18),
                width: rem(18),
              }}
            />
          </ActionIcon>
        )}
      </Group>
    );
  };

  return (
    <DefaultLayout withNavbarOpen>
      <Drawer
        opened={opened}
        onClose={close}
        title={t("lobby:btn.addGuestPlayer")}
      >
        <ScrollArea pr="xl" h="auto">
          <Stack>
            <Button
              onClick={() =>
                void router.push({
                  pathname: `/${locale}/profile/create`,
                  query: { isGuest: true },
                })
              }
            >
              {t("lobby:createGuestPlayer")}
            </Button>
            {availableProfiles.map((guestPlayer) => {
              if (selectedProfiles.includes(guestPlayer)) return;

              return (
                <div key={guestPlayer.uuid}>{renderPlayer(guestPlayer)}</div>
              );
            })}
          </Stack>
        </ScrollArea>
      </Drawer>
      <Grid gutter={0}>
        <Grid.Col span="auto" px="xs">
          <Stack gap="lg">
            <Group>
              <Title>{t("lobby:title.players")}</Title>
              <Button ml="auto" size="xs" variant="default" onClick={open}>
                {t("lobby:btn.addGuestPlayer")}
              </Button>
            </Group>
            {selectedProfiles.map((player) => (
              <div key={player.uuid}>{renderPlayer(player)}</div>
            ))}
            {selectedProfiles.length === 0 ? (
              <>EMPTY_STATE_NO_PLAYER_SELECTED</>
            ) : undefined}
          </Stack>
        </Grid.Col>
        <Grid.Col span={4} px="xs" h="100%">
          <Title>{t("lobby:title.matchSettings")}</Title>
          {/* TODO: Add settings... */}
          <Button
            disabled={selectedProfiles.length === 0}
            onClick={() => handleStartMatch()}
            mt="auto"
          >
            {t("lobby:btn.startMatch")}
          </Button>
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default NewGamePage;

export const getStaticProps = makeStaticProperties(["common", "lobby"]);

export { getStaticPaths };

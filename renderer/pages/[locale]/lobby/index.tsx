import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "../../../lib/get-static";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import type { Profile } from "types/profile";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import { useListState } from "@mantine/hooks";
import { IconUserMinus } from "@tabler/icons-react";
import { useRouter } from "next/router";

const NewGamePage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const [profiles, handlers] = useListState<Profile>([]);
  const router = useRouter();

  useEffect(() => {
    handlers.setState([]);
    void window.ipc
      .getDefaultProfile()
      .then((profile: Profile) => handlers.append(profile));

    void window.ipc.getGuestProfiles().then((profiles: Profile[]) => {
      profiles.forEach((profile) => {
        handlers.append(profile);
      });
    });
  }, []);

  const handleRemovePlayer = (uuid: Profile["uuid"]): void => {
    handlers.filter((profile) => profile.uuid !== uuid);
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
            {profile.name.firstName} {profile.name.lastName}{" "}
            <Text component="span" c="dimmed" display="block" size="xs">
              {profile.username}
            </Text>
          </Text>
        </Group>
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
      </Group>
    );
  };

  if (profiles.length !== 0) {
    return (
      <DefaultLayout withNavbarOpen>
        <Grid gutter={0}>
          <Grid.Col span="auto" px="xs">
            <Stack gap="lg">
              <Group>
                <Title>{t("lobby:title.players")}</Title>
                <Button
                  ml="auto"
                  size="xs"
                  variant="default"
                  onClick={() =>
                    void router.push({
                      pathname: `/${locale}/profile/create`,
                      query: { isGuest: true },
                    })
                  }
                >
                  {t("lobby:btn.addGuestPlayer")}
                </Button>
              </Group>
              {profiles.map((player) => (
                <div key={player.uuid}>{renderPlayer(player)}</div>
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={4} px="xs" h="100%">
            <Title>{t("lobby:title.matchSettings")}</Title>
            {/* TODO: Add settings... */}
            <Button mt="auto">{t("lobby:btn.startMatch")}</Button>
          </Grid.Col>
        </Grid>
      </DefaultLayout>
    );
  }
};

export default NewGamePage;

export const getStaticProps = makeStaticProperties(["common", "lobby"]);

export { getStaticPaths };

import type { GetStaticProps, NextPage } from "next";

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";

import { IconSettings, IconUserCircle } from "@tabler/icons-react";

import DefaultLayout from "@/components/layouts/Default";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n, useTranslation } from "next-i18next";

const Lobby: NextPage = () => {
  const { t } = useTranslation(["common", "lobbyPage"]);

  return (
    <DefaultLayout>
      <Box>
        <Title mb="sm">{t("lobbyPage:pageTitle")}</Title>
        <Tabs defaultValue="players">
          <Tabs.List position="center">
            <Tabs.Tab value="players" icon={<IconUserCircle />}>
              {t("lobbyPage:tabs.titlePlayers")}
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings />}>
              {t("lobbyPage:tabs.titleLobbySettings")}
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel mt="xl" value="players">
            <Text align="right" fz="sm" mb="xl">
              {t("lobbyPage:currentPlayersLabel", {
                CURRENT_PLAYERS: 1,
                MAX_PLAYERS: 8,
              })}
            </Text>
            <SimpleGrid cols={4}>
              <Card>
                <Stack align="center">
                  <Avatar color="blue" radius="xl" size="lg">
                    {"n"}
                  </Avatar>

                  <Text align="center">{"nap"}</Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Tabs.Panel>
          <Tabs.Panel mt="xl" value="settings">
            <Container>
              <SimpleGrid cols={3} mb="xl">
                <Select
                  label={t("gameMode")}
                  value="501"
                  defaultValue="501"
                  data={[
                    {
                      value: "701",
                      label: "701",
                    },
                    {
                      value: "501",
                      label: "501",
                    },
                    {
                      value: "301",
                      label: "301",
                    },
                  ]}
                />
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={10}
                  value={1}
                  label={t("legs")}
                />
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={10}
                  value={1}
                  label={t("sets")}
                />
                <NumberInput
                  defaultValue={2}
                  min={1}
                  max={8}
                  value={2}
                  label={t("players")}
                />
              </SimpleGrid>
              <SimpleGrid mb="xl">
                <Checkbox
                  label={t("lobbyPage:checkboxRandomizePlayerOrderLabel")}
                />
                <Checkbox label={t("lobbyPage:checkboxDeactivateStatsLabel")} />
              </SimpleGrid>
              <Group>
                <Button variant="light">
                  {t("lobbyPage:buttons.savePresetLabel")}
                </Button>
                <Button variant="default">
                  {t("lobbyPage:buttons.resetSettingsLabel")}
                </Button>
              </Group>
            </Container>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Refetch locales automatically when in dev mode
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "lobbyPage",
      ])),
    },
  };
};

export default Lobby;

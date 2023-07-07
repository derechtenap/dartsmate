import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n, useTranslation } from "next-i18next";

import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Avatar,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import type { MantineColor } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const ProfilesPage: NextPage = () => {
  const { t } = useTranslation(["profiles"]);

  const dummyPlayers: {
    color: MantineColor;
    name: string;
  }[] = [
    {
      color: "blue",
      name: "nap",
    },
    {
      color: "indigo",
      name: "Feedback",
    },
    {
      color: "grape",
      name: "Luke Skywalker",
    },
    {
      color: "pink",
      name: "Darth Vader",
    },
  ];
  return (
    <DefaultLayout>
      <Grid>
        <Grid.Col span={3}>
          <ScrollArea.Autosize mah="calc(100vh - 2rem)">
            <Stack my="xs">
              {dummyPlayers.map((player) => (
                <Group key={player.name}>
                  <Avatar color={player.color} radius="md">
                    {player.name.charAt(0)}
                  </Avatar>
                  <Text color="dimmed">{player.name}</Text>
                </Group>
              ))}
            </Stack>
          </ScrollArea.Autosize>
        </Grid.Col>
        <Grid.Col span="auto" bg={""}>
          <Flex justify="space-between">
            <Group>
              <Avatar color="blue" size="xl" radius="md">
                {"n"}
              </Avatar>
              <Title>{"nap"}</Title>
            </Group>
            <Group>
              <Tooltip label={t("tooltipEditProfile")}>
                <ActionIcon variant="light">
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={t("tooltipDeleteProfile")}>
                <ActionIcon color="red" variant="light">
                  <IconTrash />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Flex>
        </Grid.Col>
      </Grid>
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
      ...(await serverSideTranslations(locale ?? "en", ["common", "profiles"])),
    },
  };
};

export default ProfilesPage;

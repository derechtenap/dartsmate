import React from "react";
import { useTranslation } from "next-i18next";

import { getStaticPaths, makeStaticProperties } from "../../../lib/get-static";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
  Avatar,
  Divider,
  Group,
  NumberFormatter,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout withNavbarOpen>
      <Paper component="header" radius={0} p="xl" m={0}>
        <Stack>
          <Group align="start">
            <Avatar color="blue" size="xl" variant="filled">
              n
            </Avatar>
            <Stack gap={0}>
              <Title>Tim Deres</Title>
              <Text c="dimmed">nap</Text>
            </Stack>
            <Group ml="auto">
              <Tooltip label={t("editProfile", { ns: "profile" })} withArrow>
                <ActionIcon color="white" variant="transparent">
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
          <Group gap="xl" ta="center" grow mt="lg">
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                {t("stats.darts")}
              </Text>
              <NumberFormatter value={0} />
            </Stack>
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                {t("stats.180s")}
              </Text>
              <NumberFormatter value={0} />
            </Stack>
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                {t("stats.matches")}
              </Text>
              <NumberFormatter value={0} />
            </Stack>
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                {t("stats.trainings")}
              </Text>
              <NumberFormatter value={0} />
            </Stack>
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                {t("stats.avg")}
              </Text>
              <NumberFormatter decimalScale={3} value={0} />
            </Stack>
          </Group>
        </Stack>
      </Paper>
      <Divider />
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };

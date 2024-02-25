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
import type { NumberFormatterProps } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

const IndexPage = () => {
  const { t } = useTranslation();

  const stat = (
    statText: string,
    value: number,
    props?: NumberFormatterProps
  ) => {
    return (
      <Stack gap="xs">
        <Text c="dimmed" fz="xs">
          {statText}
        </Text>
        <Text fw="bold" ff="mono" fz="xl">
          <NumberFormatter {...props} value={value} />
        </Text>
      </Stack>
    );
  };

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
                <ActionIcon variant="transparent">
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
          <Group gap="xl" ta="center" grow mt="lg">
            {stat(t("stats.darts"), 0)}
            {stat(t("stats.180s"), 0)}
            {stat(t("stats.matches"), 0)}
            {stat(t("stats.trainings"), 0)}
            {stat(t("stats.avg"), 0, {
              decimalScale: 3,
            })}
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

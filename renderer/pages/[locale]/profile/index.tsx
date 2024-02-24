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
      <Paper component="header" p="xl" m={0} w={undefined}>
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
              <Tooltip label="Edit Profile" withArrow>
                <ActionIcon color="white" variant="transparent">
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
          <Group gap="xl" ta="center" grow mt="lg">
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                Darts
              </Text>
              <NumberFormatter value={0} />
            </Stack>
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                180s
              </Text>
              <NumberFormatter value={0} />
            </Stack>
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                Matches
              </Text>
              <NumberFormatter value={0} />
            </Stack>
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                Trainings
              </Text>
              <NumberFormatter value={0} />
            </Stack>
            <Stack gap="xs">
              <Text c="dimmed" fz="xs">
                AVG
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

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

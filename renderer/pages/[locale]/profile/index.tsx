import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import type { NextPage } from "next";
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
import { useRouter } from "next/router";
import { Profile } from "types/profile";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";

const ProfileIndexPage: NextPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const router = useRouter();

  const [defaultUser, setDefaultUser] = useState<Profile | null>(null);

  useEffect(() => {
    void window.ipc.getDefaultUser().then(setDefaultUser);
  }, []);

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

  if (defaultUser) {
    return (
      <DefaultLayout withNavbarOpen>
        <Paper component="header" radius={0} p="xl" m={0}>
          <Stack>
            <Group align="start">
              <Avatar color={defaultUser.color} size="xl" variant="filled">
                {getUsernameInitials(defaultUser.username)}
              </Avatar>
              <Stack gap={0}>
                <Title>
                  {defaultUser.name.firstName} {defaultUser.name.lastName}
                </Title>
                <Text c="dimmed">{defaultUser.username}</Text>
              </Stack>
              <Group ml="auto">
                <Tooltip label={t("editProfile", { ns: "profile" })} withArrow>
                  <ActionIcon
                    onClick={() => void router.push(`/${locale}/profile/edit`)}
                    variant="filled"
                  >
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
  }
};

export default ProfileIndexPage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };

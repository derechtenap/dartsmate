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
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Profile } from "types/profile";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import Stat from "@/components/content/Stat";

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

  if (defaultUser) {
    return (
      <DefaultLayout withNavbarOpen>
        <Paper component="header" radius={0} p="xl" m={0}>
          <Stack>
            <Group align="start">
              <Avatar
                color={defaultUser.color}
                src={defaultUser.avatarImage}
                size="xl"
                variant="filled"
              >
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
              <Stat text={t("stats.darts")} value={0} />
              <Stat text={t("stats.180s")} value={0} />
              <Stat text={t("stats.matches")} value={0} />
              <Stat text={t("stats.trainings")} value={0} />
              <Stat
                text={t("stats.avg")}
                value={0}
                numberProps={{
                  decimalScale: 2,
                }}
              />
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

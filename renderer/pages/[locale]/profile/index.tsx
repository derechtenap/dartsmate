import { useTranslation } from "next-i18next";
import type { NextPage } from "next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout from "@/components/layouts/Default";
import {
  ActionIcon,
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
import Stat from "@/components/content/Stat";
import getFormattedName from "utils/misc/getFormattedName";
import ProfileAvatar from "@/components/content/ProfileAvatar";
import { useDefaultProfile } from "hooks/useDefaultProfile";

const ProfileIndexPage: NextPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const router = useRouter();

  const { data: defaultProfile } = useDefaultProfile();

  if (defaultProfile) {
    return (
      <DefaultLayout withNavbarOpen>
        <Paper component="header" radius={0} p="xl" m={0}>
          <Stack>
            <Group align="start">
              <ProfileAvatar
                color={defaultProfile.color}
                profile={defaultProfile}
                size="xl"
                variant="filled"
              />
              <Stack gap={0}>
                <Title>{getFormattedName(defaultProfile.name)}</Title>
                <Text c="dimmed">{defaultProfile.username}</Text>
              </Stack>
              <Group ml="auto">
                <Tooltip label={t("profile:editProfile")} withArrow>
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

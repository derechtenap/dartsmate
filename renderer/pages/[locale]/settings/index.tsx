import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import SettingsLayout from "@/components/layouts/SettingsLayout";

import ProfileAvatar from "@/components/content/ProfileAvatar";
import getFormattedName from "utils/misc/getFormattedName";
import { IconUserDown, IconUserEdit, IconUserMinus } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useRouter } from "next/router";
import getDefaultIconSize from "utils/misc/getDefaultIconSize";
import {
  useDefaultProfile,
  useDeleteDefaultProfile,
} from "hooks/useDefaultProfile";
import { notifications } from "@mantine/notifications";

const SettingsPage = () => {
  const { data: defaultProfile } = useDefaultProfile();
  const { mutate: deleteProfile } = useDeleteDefaultProfile();

  const router = useRouter();
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  const handleDeleteProfile = () => {
    modals.openConfirmModal({
      title: t("settings:deleteProfile.title"),
      children: <Text>{t("settings:deleteProfile.confirmText")}</Text>,
      labels: {
        confirm: t("settings:deleteProfile.title"),
        cancel: t("cancel"),
      },
      overlayProps: {
        backgroundOpacity: 0.75,
        blur: 3,
      },
      onConfirm: () => {
        // TODO: Add translation keys here
        deleteProfile(undefined, {
          onSuccess: () => {
            notifications.show({
              title: "Profile deleted!",
              message: "Hopefully we see you again!",
            });

            void router.push(`/${locale}/welcome`);
          },
          onError: (err) => {
            console.error("Failed to delete profile: ", err);
            notifications.show({
              title: "Unable to delete Profile!",
              message: "",
            });
          },
        });
      },
    });
  };

  return (
    <SettingsLayout route="/">
      <Stack>
        {defaultProfile ? (
          <>
            <Title>{t("routes.profile")}</Title>
            <Text>{t("settings:profile.text")}</Text>
            <Group>
              <ProfileAvatar size="lg" profile={defaultProfile} />
              <Stack gap={0}>
                <Text>{getFormattedName(defaultProfile.name)}</Text>
                <Text fz="xs" c="dimmed">
                  {defaultProfile.username}{" "}
                </Text>
              </Stack>
            </Group>
            <Button.Group mt="lg">
              <Button
                onClick={() => void router.push(`/${locale}/profile/edit`)}
                variant="default"
                leftSection={<IconUserEdit style={getDefaultIconSize()} />}
              >
                {t("profile:editProfile")}
              </Button>
              <Button
                disabled
                leftSection={<IconUserDown style={getDefaultIconSize()} />}
                variant="default"
              >
                {t("profile:exportProfile")}
              </Button>
              <Button
                leftSection={<IconUserMinus style={getDefaultIconSize()} />}
                onClick={() => handleDeleteProfile()}
              >
                {t("settings:deleteProfile.title")}
              </Button>
            </Button.Group>
          </>
        ) : null}
      </Stack>
    </SettingsLayout>
  );
};

export default SettingsPage;

export const getStaticProps = makeStaticProperties([
  "common",
  "profile",
  "settings",
]);

export { getStaticPaths };

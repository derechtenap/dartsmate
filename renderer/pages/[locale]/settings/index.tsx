import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "../../../lib/get-static";
import DefaultLayout from "@/components/layouts/Default";
import {
  Grid,
  NavLink,
  Tabs,
  Title,
  Text,
  rem,
  Stack,
  SegmentedControl,
  Center,
  useMantineColorScheme,
  MantineColorScheme,
  SegmentedControlProps,
  Select,
  ComboboxData,
  Button,
  Modal,
  Group,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconDeviceDesktop,
  IconLanguage,
  IconMoon,
  IconPalette,
  IconSun,
} from "@tabler/icons-react";
import { i18n as _i18n } from "../../.././../next-i18next.config";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";

const SettingsPage = () => {
  const iconStyles = { height: rem(20), width: rem(20) };
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  const settingsRoutes = [
    {
      label: t("settings.colorScheme.title", {
        ns: "settings",
      }),
      tabValue: "cs",
      icon: <IconPalette style={iconStyles} />,
    },
    {
      label: t("settings.language.title", {
        ns: "settings",
      }),
      tabValue: "la",
      icon: <IconLanguage style={iconStyles} />,
    },
    {
      label: t("settings.dangerZone.title", {
        ns: "settings",
      }),
      tabValue: "da",
      icon: <IconAlertTriangle style={iconStyles} />,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(
    settingsRoutes[0].tabValue
  );

  const locals: ComboboxData = _i18n.locales.map((locale) => ({
    label: t(`languages.${locale}`, {
      ns: "settings",
    }),
    value: locale,
  }));

  useEffect(() => {
    window.ipc.setLocale(locale);
  }, [locale]);

  const dataColorSchemes: SegmentedControlProps["data"] = [
    {
      value: "light",
      label: (
        <Center style={{ gap: 10 }}>
          <IconSun style={iconStyles} />
          <span>
            {t("colorSchemes.light", {
              ns: "settings",
            })}
          </span>
        </Center>
      ),
    },
    {
      value: "dark",
      label: (
        <Center style={{ gap: 10 }}>
          <IconMoon style={iconStyles} />
          <span>
            {t("colorSchemes.dark", {
              ns: "settings",
            })}
          </span>
        </Center>
      ),
    },
    {
      value: "auto",
      label: (
        <Center style={{ gap: 10 }}>
          <IconDeviceDesktop style={iconStyles} />
          <span>
            {t("colorSchemes.auto", {
              ns: "settings",
            })}
          </span>
        </Center>
      ),
    },
  ];

  const handleChangeLanguage = (newLanguage: string) => {
    const newPath = router.pathname.replace("[locale]", newLanguage);
    void router.push(newPath);
  };

  const handleProfileDeletion = () => {
    window.ipc.deleteDefaultUser();
    void router.push(`/${locale}/profile/create`);
  };

  const renderTabs = () => {
    return (
      <Grid.Col span={4}>
        {settingsRoutes.map((route) => (
          <NavLink
            active={activeTab === route.tabValue}
            key={route.label}
            leftSection={route.icon}
            label={route.label}
            onClick={() => setActiveTab(route.tabValue)}
            variant="filled"
          />
        ))}
      </Grid.Col>
    );
  };

  const renderColorSchemeTab = () => {
    return (
      <Tabs.Panel value="cs">
        <Stack>
          <Title>
            {t("settings.colorScheme.title", {
              ns: "settings",
            })}
          </Title>
          <Text mb="lg">
            {t("settings.colorScheme.text", {
              ns: "settings",
            })}
          </Text>
          <SegmentedControl
            color="red"
            onChange={(newScheme) =>
              setColorScheme(newScheme as MantineColorScheme)
            }
            data={dataColorSchemes}
            defaultValue={colorScheme}
            withItemsBorders={false}
          />
        </Stack>
      </Tabs.Panel>
    );
  };

  const renderLanguageTab = () => {
    return (
      <Tabs.Panel value="la">
        <Stack>
          <Title>
            {t("settings.language.title", {
              ns: "settings",
            })}
          </Title>
          <Text mb="lg">
            {t("settings.language.text", {
              ns: "settings",
            })}
          </Text>
          <Select
            allowDeselect={false}
            searchable
            label={t("settings.language.title", {
              ns: "settings",
            })}
            defaultValue={locale}
            data={locals}
            onChange={(newLanguage) =>
              handleChangeLanguage(newLanguage as string)
            }
          />
        </Stack>
      </Tabs.Panel>
    );
  };

  const renderDangerZoneTab = () => {
    return (
      <Tabs.Panel value="da">
        <Stack>
          <Title>
            {t("settings.dangerZone.title", {
              ns: "settings",
            })}
          </Title>
          <Text>
            {t("settings.dangerZone.text", {
              ns: "settings",
            })}
          </Text>
          <Title order={2}>
            {t("settings.dangerZone.section.deleteProfile.title", {
              ns: "settings",
            })}
          </Title>
          <Text mb="lg">
            {t("settings.dangerZone.section.deleteProfile.text", {
              ns: "settings",
            })}
          </Text>
          <Button onClick={open} w="fit-content">
            {t("settings.dangerZone.btn.deleteProfile", {
              ns: "settings",
            })}
          </Button>
        </Stack>
      </Tabs.Panel>
    );
  };

  const renderModalContent = () => {
    return (
      <Stack>
        <Text>
          {t("settings.dangerZone.section.deleteProfile.confirmText", {
            ns: "settings",
          })}
        </Text>
        <Group>
          <Button onClick={handleProfileDeletion}>
            {t("settings.dangerZone.btn.deleteProfile", {
              ns: "settings",
            })}
          </Button>
          <Button onClick={close} variant="default">
            {t("buttons.cancel", {
              ns: "profile",
            })}
          </Button>
        </Group>
      </Stack>
    );
  };

  return (
    <DefaultLayout withNavbarOpen>
      <Modal
        opened={opened}
        onClose={close}
        title={t("settings.dangerZone.section.deleteProfile.title", {
          ns: "settings",
        })}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
      >
        {renderModalContent()}
      </Modal>
      <Grid gutter={0}>
        {renderTabs()}
        <Grid.Col span="auto" px="xs">
          <Tabs value={activeTab}>
            {renderColorSchemeTab()}
            {renderLanguageTab()}
            {renderDangerZoneTab()}
          </Tabs>
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default SettingsPage;

export const getStaticProps = makeStaticProperties([
  "common",
  "profile",
  "settings",
]);

export { getStaticPaths };

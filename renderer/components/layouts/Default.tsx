import {
  ActionIcon,
  AppShell,
  Center,
  Menu,
  Navbar,
  NavLink,
  Text,
} from "@mantine/core";
import { useFullscreen, useLocalStorage } from "@mantine/hooks";
import {
  IconAdjustments,
  IconCategory,
  IconCirclePlus,
  IconCircleX,
  IconMaximize,
  IconMaximizeOff,
  IconMoon,
  IconSettings,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Props = {
  children: React.ReactNode;
};

export const navbarWidth = 160;

const DefaultLayout = ({ children }: Props) => {
  const router = useRouter();
  const { t } = useTranslation(["common"]);

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
  });

  const { toggle, fullscreen } = useFullscreen();

  const toggleFullscreen = () => {
    return toggle();
  };

  const routes = [
    {
      icon: <IconCategory />,
      label: t("navbar.routes.routeHubLabel"),
      link: "/",
    },
    {
      icon: <IconCirclePlus />,
      label: t("navbar.routes.routeNewGameLabel"),
      link: "/lobby",
    },
    {
      icon: <IconUserCircle />,
      label: t("navbar.routes.routeProfilesLabel"),
      link: "/profiles",
    },
    {
      icon: <IconCircleX />,
      label: t("navbar.routes.routeCloseAppLabel"),
      link: "/quit",
    },
  ];

  return (
    <AppShell
      navbar={
        <Navbar height="100vh" p="xs" width={{ base: navbarWidth }}>
          <Navbar.Section grow>
            {routes.map((route) => (
              <Link href={route.link} key={route.label}>
                <NavLink label={route.label} icon={route.icon} />
              </Link>
            ))}
          </Navbar.Section>
          <Navbar.Section>
            <Center>
              <Menu arrowPosition="center" position="right-end" withArrow>
                <Menu.Target>
                  <ActionIcon size="xl">
                    <IconSettings />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() =>
                      setColorScheme(colorScheme === "dark" ? "light" : "dark")
                    }
                    closeMenuOnClick={false}
                    icon={colorScheme === "light" ? <IconSun /> : <IconMoon />}
                    rightSection={
                      <Text size="xs" color="dimmed" ml="xs">
                        {t("navbar.menuItemColorSchemeLabelHotkey")}
                      </Text>
                    }
                  >
                    {t("navbar.menuItemColorSchemeLabel")}
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => void toggleFullscreen()}
                    closeMenuOnClick={false}
                    icon={fullscreen ? <IconMaximizeOff /> : <IconMaximize />}
                  >
                    {fullscreen
                      ? t("navbar.menuItemToggleFullscreenModeWindowedLabel")
                      : t("navbar.menuItemToggleFullscreenModeFullscreenLabel")}
                  </Menu.Item>
                  <Menu.Item
                    closeMenuOnClick={false}
                    icon={<IconAdjustments />}
                    onClick={() => void router.push("/settings")}
                  >
                    {t("navbar.menuItemAppSettingsLabel")}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Center>
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default DefaultLayout;

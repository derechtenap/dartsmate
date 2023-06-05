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
  IconCategory,
  IconCirclePlus,
  IconCircleX,
  IconLanguage,
  IconMaximize,
  IconMaximizeOff,
  IconMoon,
  IconSettings,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export const navbarWidth = 160;

const DefaultLayout = ({ children }: Props) => {
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
      label: "Hub",
      link: "/",
    },
    {
      icon: <IconCirclePlus />,
      label: "New Game",
      link: "/lobby",
    },
    {
      icon: <IconUserCircle />,
      link: "/profiles",
      label: "Profiles",
    },
    {
      icon: <IconCircleX />,
      link: "/quit",
      label: "Close App",
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
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item
                    onClick={() =>
                      setColorScheme(colorScheme === "dark" ? "light" : "dark")
                    }
                    closeMenuOnClick={false}
                    icon={colorScheme === "light" ? <IconSun /> : <IconMoon />}
                    rightSection={
                      <Text size="xs" color="dimmed" ml="xs">
                        CTRL + T
                      </Text>
                    }
                  >
                    Color Scheme
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => void toggleFullscreen()}
                    closeMenuOnClick={false}
                    icon={fullscreen ? <IconMaximizeOff /> : <IconMaximize />}
                  >
                    {fullscreen ? "Windowed Mode" : "Fullscreen Mode"}
                  </Menu.Item>
                  <Menu.Item
                    closeMenuOnClick={false}
                    icon={<IconLanguage />}
                    disabled
                  >
                    Language
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

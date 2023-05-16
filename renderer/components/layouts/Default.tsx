import { AppShell, Center, Menu, Navbar, Text, ThemeIcon } from "@mantine/core";
import { useFullscreen, useLocalStorage } from "@mantine/hooks";
import {
  IconLanguage,
  IconMaximize,
  IconMaximizeOff,
  IconMoon,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
  });

  const { toggle, fullscreen } = useFullscreen();

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar height="100vh" p="xs" width={{ base: 100 }}>
          <Navbar.Section>TOP</Navbar.Section>
          <Navbar.Section grow mt="lg">
            MID
          </Navbar.Section>
          <Navbar.Section>
            <Center>
              <Menu arrowPosition="center" position="right-end" withArrow>
                <Menu.Target>
                  <ThemeIcon
                    variant="default"
                    size="xl"
                    className="cursor-pointer"
                  >
                    <IconSettings />
                  </ThemeIcon>
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
                    onClick={toggle}
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

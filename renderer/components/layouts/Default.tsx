import {
  ActionIcon,
  AppShell,
  Button,
  Center,
  Group,
  Header,
  Menu,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconDisc,
  IconDots,
  IconList,
  // IconListNumbers,
  // IconSchool,
  IconSettings,
  IconSquareLetterD,
  // IconTournament,
  IconUsersGroup,
  IconWindowMaximize,
  IconWindowMinimize,
  IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useDisclosure, useFullscreen } from "@mantine/hooks";
import { ipcRenderer } from "electron";
import LoadingOverlay from "../LoadingOverlay";
import ActionButton from "../content/ActionButton";

type DefaultLayoutProps = {
  children: React.ReactNode;
  isFetching?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
};

type NavbarLinkProps = {
  icon: JSX.Element;
  label: string;
  route: string;
};

export const navbarWidth = 70;
export const headerHeight = 45;

const DefaultLayout = ({
  children,
  isFetching,
  isLoading,
  isSuccess,
}: DefaultLayoutProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { push } = useRouter();
  const { toggle, fullscreen } = useFullscreen();

  // TODO: Some routes are currently unfinished and disabled. Reactivate the routes when the pages are created
  const mainRoutes: NavbarLinkProps[] = [
    { icon: <IconDisc size={14} />, label: "Lobby", route: "/lobby" },
    /*
    {
      icon: <IconSchool size={14} />,
      label: "Training",
      route: "/training",
    },

    {
      icon: <IconTournament size={14} />,
      label: "Tournament",
      route: "/tournament",
    },
    */
    {
      icon: <IconUsersGroup size={14} />,
      label: "Profiles",
      route: "/profiles",
    },
    {
      icon: <IconList size={14} />,
      label: "Replays",
      route: "/replays",
    },
    /*
    {
      icon: <IconListNumbers size={14} />,
      label: "Ranking",
      route: "/ranking",
    },
    */
  ];

  const miscRoutes: NavbarLinkProps[] = [
    {
      icon: <IconSettings size={14} />,
      label: "Settings",
      route: "/settings",
    },
  ];

  if (isLoading || isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <AppShell
      py={0}
      header={
        <Header
          className="draggable"
          height={headerHeight}
          style={{ display: "flex", alignItems: "center" }}
          px="sm"
        >
          <Group w="100%">
            <ActionIcon
              color="red"
              radius="xs"
              variant="filled"
              onClick={() => void push("/")}
            >
              <IconSquareLetterD />
            </ActionIcon>
            <Button.Group>
              {mainRoutes.map((route) => (
                <Button
                  key={route.route}
                  leftIcon={route.icon}
                  radius="xs"
                  onClick={() => void push(route.route)}
                  uppercase
                  variant="transparent"
                >
                  {route.label}
                </Button>
              ))}
            </Button.Group>
            <Group ml="auto">
              <Menu shadow="md" radius={0} width={200}>
                <Menu.Target>
                  <ActionIcon>
                    <IconDots />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  {miscRoutes.map((route) => (
                    <Menu.Item
                      icon={route.icon}
                      key={route.label}
                      onClick={() => void push(route.route)}
                    >
                      {route.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
              <ActionButton
                action={() => void toggle()}
                icon={
                  fullscreen ? <IconWindowMinimize /> : <IconWindowMaximize />
                }
                label={`${fullscreen ? "Minimize" : "Maximize"} Window`}
              />
              <ActionButton
                action={() => open()}
                icon={<IconX />}
                label="Quit App"
              />
            </Group>
          </Group>
        </Header>
      }
    >
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        overlayProps={{
          blur: 5,
        }}
      >
        <Modal.Body>
          <Title mb="lg">Confirm Quit</Title>
          <Text color="dimmed" mb="lg">
            Any unsaved data will be lost. Are you sure you want to quit the
            app?
          </Text>
          <Group>
            <Button
              onClick={() => void ipcRenderer.send("quit-app")}
              variant="outline"
            >
              Yes
            </Button>
            <Button onClick={() => void close()} variant="default">
              No
            </Button>
          </Group>
        </Modal.Body>
      </Modal>
      {isSuccess ? (
        children
      ) : (
        <Center w="50%" mx="auto" h="100vh">
          <Stack>
            <Title>Oh snap!</Title>
            <Text>
              An internal error has occurred, preventing the creation of the
              page you requested. We apologize for the inconvenience. To resolve
              this issue, we recommend restarting the application and attempting
              the operation again. If the problem persists, please contact our
              support team for further assistance.
            </Text>
          </Stack>
        </Center>
      )}
    </AppShell>
  );
};

export default DefaultLayout;

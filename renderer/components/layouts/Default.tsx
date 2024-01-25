import {
  ActionIcon,
  AppShell,
  Flex,
  Group,
  Stack,
  Tooltip,
} from "@mantine/core";
import {
  IconCloudUpload,
  IconCloudX,
  IconDisc,
  IconLetterD,
  IconList,
  IconListNumbers,
  IconSchool,
  IconSettings,
  IconTournament,
  IconUsersGroup,
} from "@tabler/icons-react";
import LoadingOverlay from "../LoadingOverlay";
import { APP_NAME } from "utils/constants";
import Link from "next/link";

import LayoutControls from "./misc/LayoutControls";
import { useNetwork } from "@mantine/hooks";

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
  const network = useNetwork();

  const mainRoutes: NavbarLinkProps[] = [
    {
      icon: <IconDisc />,
      label: "Lobby",
      route: "/lobby",
    },
    {
      icon: <IconSchool />,
      label: "Training",
      route: "/training",
    },
    {
      icon: <IconTournament />,
      label: "Tournament",
      route: "/tournament",
    },
    {
      icon: <IconUsersGroup />,
      label: "Profiles",
      route: "/profiles",
    },
    {
      icon: <IconList />,
      label: "Replays",
      route: "/replays",
    },
    {
      icon: <IconListNumbers />,
      label: "Ranking",
      route: "/ranking",
    },
  ];

  const miscRoutes: NavbarLinkProps[] = [
    {
      icon: <IconSettings />,
      label: "Settings",
      route: "/settings",
    },
  ];

  if (isLoading || isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <AppShell header={{ height: headerHeight }} py={0}>
      <AppShell.Header>
        <Flex mx="sm" align="center" h={headerHeight}>
          <Group fz="sm" gap="sm" tt="uppercase" fw="bold">
            <Link href="/">
              <ActionIcon aria-label={`${APP_NAME} Logo`} variant="light">
                <IconLetterD />
              </ActionIcon>
            </Link>
            {APP_NAME}
          </Group>
          <Group ml="auto">
            {network.online ? (
              <Tooltip
                label="Online profiles and matches are available."
                multiline
                offset={15}
                position="bottom"
                w={200}
                withArrow
              >
                <IconCloudUpload
                  color="green"
                  style={{
                    cursor: "help",
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip
                label={`${APP_NAME} is running in local mode. Online profiles and matches are unavailable.`}
                multiline
                offset={15}
                position="bottom"
                w={200}
                withArrow
              >
                <IconCloudX
                  color="red"
                  style={{
                    cursor: "help",
                  }}
                />
              </Tooltip>
            )}
            {miscRoutes.map((route) => (
              <Link href={route.route} key={route.route}>
                <Tooltip
                  label={route.label}
                  position="bottom"
                  transitionProps={
                    {
                      // duration: 0
                    }
                  }
                  offset={15}
                  withArrow
                >
                  <ActionIcon c="gray" variant="transparent">
                    {route.icon}
                  </ActionIcon>
                </Tooltip>
              </Link>
            ))}
            <LayoutControls />
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar h="100vh" w={navbarWidth}>
        <Stack mt="sm" mx="auto">
          {mainRoutes.map((route) => (
            <Link href={route.route} key={route.route}>
              <Tooltip
                label={route.label}
                position="right"
                transitionProps={
                  {
                    // duration: 0,
                  }
                }
                offset={30}
                withArrow
              >
                <ActionIcon
                  aria-label={route.label}
                  c="gray"
                  variant="transparent"
                >
                  {route.icon}
                </ActionIcon>
              </Tooltip>
            </Link>
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main h="100vh">
        {/* TODO: Add better error handling... */}
        {isSuccess ? children : "Error_Unable_To_Create_Page"}
      </AppShell.Main>
    </AppShell>
  );
};

export default DefaultLayout;

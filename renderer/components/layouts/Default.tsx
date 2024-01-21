import {
  ActionIcon,
  AppShell,
  Flex,
  Group,
  Stack,
  Tooltip,
} from "@mantine/core";
import {
  IconDisc,
  IconLetterD,
  IconList,
  // IconListNumbers,
  // IconSchool,
  IconSettings,
  // IconTournament,
  IconUsersGroup,
} from "@tabler/icons-react";
import LoadingOverlay from "../LoadingOverlay";
import { APP_NAME } from "utils/constants";

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
  /*
   *
   * TODO: Some routes are currently unfinished and disabled.
   * Reactivate the routes when the pages are created!
   *
   */
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
    <AppShell header={{ height: headerHeight }} py={0}>
      <AppShell.Header>
        <Flex mx="sm" align="center" h={headerHeight}>
          <Group fz="sm" gap="sm" tt="uppercase">
            <ActionIcon aria-label={`${APP_NAME} Logo`} variant="light">
              <IconLetterD />
            </ActionIcon>
            {APP_NAME}
          </Group>
          <Group ml="auto">
            {miscRoutes.map((route) => (
              <Tooltip
                key={route.route}
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
            ))}
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar h="100vh">
        <Stack mt="sm" mx="sm">
          {mainRoutes.map((route) => (
            <Tooltip
              key={route.route}
              label={route.label}
              position="right"
              transitionProps={
                {
                  // duration: 0,
                }
              }
              offset={20}
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
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main h="100vh">{children}</AppShell.Main>
    </AppShell>
  );
};

export default DefaultLayout;

import {
  ActionIcon,
  AppShell,
  Burger,
  Divider,
  Flex,
  Group,
  NavLink,
  ScrollAreaAutosize,
  Text,
} from "@mantine/core";
import {
  useDisclosure,
  useFullscreen,
  useNetwork,
  useOs,
} from "@mantine/hooks";
import {
  IconBarbell,
  IconChartBar,
  IconHistory,
  IconHome,
  IconMinus,
  IconSettings,
  IconSquare,
  IconSquareX,
  IconSquaresDiagonal,
  IconTarget,
  IconUser,
} from "@tabler/icons-react";
import { i18n, useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { APP_NAME, APP_VERSION } from "utils/constants";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export const headerHeight = 50; // px
export const navbarWidth = 200; // px

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { toggle: toggleFullscreen, fullscreen } = useFullscreen();
  const [isNavbarOpened, { toggle: toggleNavbar }] = useDisclosure(true);
  const clientOs = useOs();
  const networkStatus = useNetwork();

  const router = useRouter();
  const locale = i18n?.language as string;
  const { t } = useTranslation(["common"]);

  const navbarRoutes = [
    {
      icon: <IconHome />,
      label: t("navbarLabels.home"),
      route: "/",
    },
    {
      icon: <IconTarget />,
      label: t("navbarLabels.newMatch"),
      route: "/lobby",
    },
    {
      icon: <IconBarbell />,
      label: t("navbarLabels.practice"),
      route: "/practice",
    },
    {
      icon: <IconHistory />,
      label: t("navbarLabels.history"),
      route: "/history",
    },
    {
      icon: <IconUser />,
      label: t("navbarLabels.profile"),
      route: "/profile",
    },
    {
      icon: <IconChartBar />,
      label: t("navbarLabels.statistics"),
      route: "/statistics",
    },
    {
      icon: <IconSettings />,
      label: t("navbarLabels.settings"),
      route: "/settings",
    },
  ];

  const isActiveRoute = (route: string) => {
    return `/${locale + route}` === router.asPath;
  };

  return (
    <AppShell
      header={{
        height: headerHeight,
      }}
      navbar={{
        width: {
          // `md` is the smallest used breakpoint since the app requires 1024x768 pixels
          md: navbarWidth,
          lg: navbarWidth * 1.25,
          xl: navbarWidth * 1.4,
        },
        breakpoint: "xs",
        collapsed: {
          mobile: !isNavbarOpened,
          desktop: !isNavbarOpened,
        },
      }}
    >
      <AppShell.Header className="draggable">
        <Flex
          align="center"
          justify="space-between"
          h={headerHeight}
          mah={headerHeight}
          px="sm"
          w="100%"
        >
          <Group gap="lg">
            <Burger
              aria-label=""
              onClick={toggleNavbar}
              opened={isNavbarOpened}
              size="sm"
            />
            <Text fz="sm" ta="center" tt="uppercase">
              {APP_NAME}
            </Text>
          </Group>
          <Group gap="lg">
            <ActionIcon c="dimmed" variant="transparent">
              <IconMinus />
            </ActionIcon>
            <ActionIcon
              c="dimmed"
              onClick={() => void toggleFullscreen()}
              variant="transparent"
            >
              {fullscreen ? <IconSquaresDiagonal /> : <IconSquare />}
            </ActionIcon>
            <ActionIcon c="dimmed" variant="transparent">
              <IconSquareX />
            </ActionIcon>
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section component={ScrollAreaAutosize} grow>
          {navbarRoutes.map((route) => (
            <NavLink
              active={isActiveRoute(route.route)}
              key={route.route}
              label={route.label}
              leftSection={route.icon}
              variant="filled"
            />
          ))}
        </AppShell.Section>
        <Divider />
        <AppShell.Section p="lg">
          <Text c="dimmed" ta="center">
            <Text component="span" fz="xs" display="block">
              {APP_VERSION}
            </Text>
            <Text component="span" fz="xs" display="block">
              {clientOs.charAt(0).toLocaleUpperCase(locale) + clientOs.slice(1)}
            </Text>
            <Text component="span" fz="xs" display="block">
              Network Status: {networkStatus.online ? "Online" : "Offline"}
            </Text>
          </Text>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DefaultLayout;

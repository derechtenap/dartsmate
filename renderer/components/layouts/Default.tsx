import {
  ActionIcon,
  AppShell,
  Container,
  Divider,
  Flex,
  Group,
  NavLink,
  ScrollAreaAutosize,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  upperFirst,
  useDisclosure,
  useFullscreen,
  useNetwork,
  useOs,
} from "@mantine/hooks";
import {
  IconMenu2,
  IconMinus,
  IconSquare,
  IconSquareX,
  IconSquaresDiagonal,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { APP_NAME, APP_VERSION } from "utils/constants";
import navbarRoutes from "utils/content/navbarRoutes";
import sendIPC from "utils/ipc/send";
import formatLocalizedRoute from "utils/navigation/formatLocalizedRoute";

type DefaultLayoutProps = {
  children: React.ReactNode;
  withNavbarOpen: boolean;
};

export const headerHeight = 50; // px
export const navbarWidth = 200; // px

const DefaultLayout = ({
  children,
  withNavbarOpen = true,
}: DefaultLayoutProps) => {
  const { toggle: toggleFullscreen, fullscreen } = useFullscreen();
  const [isNavbarOpened, { toggle: toggleNavbar }] =
    useDisclosure(withNavbarOpen);
  const CLIENT_OS = useOs();
  const { online: NETWORK_STATUS } = useNetwork();

  const router = useRouter();

  const {
    t,
    i18n: { language: locale },
  } = useTranslation(["common"]);

  const isActiveRoute = (route: string) => {
    const currentRoute = router.asPath;
    const localizedRoute = formatLocalizedRoute({
      locale,
      route,
    });

    /*
     * Check if the current route is exactly equal to the localized one.
     * Or handle the case case where the current route is sub-route of
     * the base route.
     */
    return (
      currentRoute === localizedRoute ||
      currentRoute.startsWith(`${localizedRoute}/`)
    );
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
            <Tooltip label={t("toggleNavigation")} withArrow>
              <ActionIcon
                color="gray"
                onClick={toggleNavbar}
                variant="transparent"
              >
                <IconMenu2 />
              </ActionIcon>
            </Tooltip>
            <Text fz="sm" ta="center" tt="uppercase">
              {APP_NAME}
            </Text>
          </Group>
          <Group gap="lg">
            {!fullscreen ? (
              <Tooltip label={t("minimizeApp")} withArrow>
                <ActionIcon
                  c="dimmed"
                  onClick={() => sendIPC("minimize-app-window")}
                  variant="transparent"
                >
                  <IconMinus />
                </ActionIcon>
              </Tooltip>
            ) : null}
            <Tooltip
              label={fullscreen ? t("windowedMode") : t("fullscreenMode")}
              withArrow
            >
              <ActionIcon
                c="dimmed"
                onClick={() => void toggleFullscreen()}
                variant="transparent"
              >
                {fullscreen ? <IconSquaresDiagonal /> : <IconSquare />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label={t("closeApp")} withArrow>
              <ActionIcon
                c="dimmed"
                onClick={() => sendIPC("close-app")}
                variant="transparent"
              >
                <IconSquareX />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section component={ScrollAreaAutosize} grow>
          {navbarRoutes.map((route) => (
            <NavLink
              active={isActiveRoute(route.route)}
              key={route.route}
              label={t(route.label)}
              leftSection={route.icon}
              variant="filled"
              onClick={() =>
                void router.push(
                  formatLocalizedRoute({
                    locale,
                    route: route.route,
                  })
                )
              }
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
              {upperFirst(CLIENT_OS)}
            </Text>
            <Text component="span" fz="xs" display="block">
              {t("networkStatus.text")}:{" "}
              {NETWORK_STATUS
                ? t("networkStatus.online")
                : t("networkStatus.offline")}
            </Text>
          </Text>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container
          px={{
            xs: 0,
          }}
        >
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default DefaultLayout;

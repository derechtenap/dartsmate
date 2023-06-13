import {
  AppShell,
  createStyles,
  Navbar,
  rem,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  Icon,
  IconDisc,
  IconHome2,
  IconListNumbers,
  IconSchool,
  IconSettings,
  IconSquareRoundedX,
  IconTournament,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Props = {
  children: React.ReactNode;
};

type NavbarLinkProps = {
  active?: boolean;
  disabled?: boolean;
  icon: Icon;
  label: string;
  route: string;
};

export const navbarWidth = 70;

const DefaultLayout = ({ children }: Props) => {
  const { route, push } = useRouter();
  const { t } = useTranslation(["common"]);

  const mainRoutes: NavbarLinkProps[] = [
    { icon: IconHome2, label: t("navbar.routes.homeLabel"), route: "/" },
    { icon: IconDisc, label: t("navbar.routes.newGameLabel"), route: "/lobby" },
    {
      icon: IconSchool,
      disabled: true,
      label: t("navbar.routes.trainingLabel"),
      route: "/training",
    },
    {
      icon: IconTournament,
      disabled: true,
      label: t("navbar.routes.tournamentLabel"),
      route: "/tournament",
    },
    {
      icon: IconUsersGroup,
      label: t("navbar.routes.profilesLabel"),
      route: "/profiles",
    },
    {
      icon: IconListNumbers,
      disabled: true,
      label: t("navbar.routes.rankingLabel"),
      route: "/ranking",
    },
  ];

  const miscRoutes: NavbarLinkProps[] = [
    {
      icon: IconSettings,
      label: t("navbar.routes.settingsLabel"),
      route: "/settings",
    },
    {
      icon: IconSquareRoundedX,
      label: t("navbar.routes.quitAppLabel"),
      route: "#?quitApp",
    },
  ];

  const useStyles = createStyles((theme) => ({
    link: {
      width: rem(50),
      height: rem(50),
      borderRadius: theme.radius.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.dark[5],

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
      },
      "&:disabled": {
        cursor: "not-allowed",
      },
    },
    active: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  }));

  const NavbarLink = ({
    icon: Icon,
    label,
    disabled,
    active,
    route,
  }: NavbarLinkProps) => {
    const { classes, cx } = useStyles();
    return (
      <Tooltip label={label} position="right" offset={15} withArrow>
        <UnstyledButton
          onClick={() => void push(route)}
          className={cx(classes.link, { [classes.active]: active })}
          disabled={disabled}
        >
          <Icon size="1.2rem" stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
  };

  const appendNavbarRoutes = (links: NavbarLinkProps[]) => {
    return links.map((link) => (
      <NavbarLink {...link} active={route === link.route} key={link.label} />
    ));
  };

  return (
    <AppShell
      navbar={
        <Navbar height="100vh" p="xs" width={{ base: navbarWidth }}>
          <Navbar.Section grow>
            <Stack justify="center" spacing="xs">
              {appendNavbarRoutes(mainRoutes)}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing="xs">
              {appendNavbarRoutes(miscRoutes)}
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default DefaultLayout;

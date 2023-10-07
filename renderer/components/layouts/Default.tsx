import {
  AppShell,
  Button,
  Center,
  createStyles,
  Group,
  Modal,
  Navbar,
  rem,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  Icon,
  IconDisc,
  IconHome2,
  IconList,
  IconListNumbers,
  IconSchool,
  IconSettings,
  IconSquareRoundedX,
  IconTournament,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import { ipcRenderer } from "electron";
import LoadingOverlay from "../LoadingOverlay";

type DefaultLayoutProps = {
  children: React.ReactNode;
  isFetching?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
};

type NavbarLinkProps = {
  action?: () => void;
  active?: boolean;
  disabled?: boolean;
  icon: Icon;
  label: string;
  route: string;
};

export const navbarWidth = 70;

const DefaultLayout = ({
  children,
  isFetching,
  isLoading,
  isSuccess,
}: DefaultLayoutProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { route, push } = useRouter();

  const mainRoutes: NavbarLinkProps[] = [
    { icon: IconHome2, label: "Home", route: "/" },
    { icon: IconDisc, label: "Lobby", route: "/lobby" },
    { icon: IconList, label: "Previous Matches", route: "/previousMatches" },
    {
      icon: IconSchool,
      disabled: true,
      label: "Training",
      route: "/training",
    },
    {
      icon: IconTournament,
      disabled: true,
      label: "Tournament",
      route: "/tournament",
    },
    {
      icon: IconUsersGroup,
      label: "Profiles",
      route: "/profiles",
    },
    {
      icon: IconListNumbers,
      disabled: true,
      label: "Ranking",
      route: "/ranking",
    },
  ];

  const miscRoutes: NavbarLinkProps[] = [
    {
      icon: IconSettings,
      label: "Settings",
      route: "/settings",
    },
    {
      icon: IconSquareRoundedX,
      action: () => open(),
      label: "Quit App",
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
    action,
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
          onClick={action ? action : () => void push(route)}
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

  if (isLoading || isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <AppShell
      py={0}
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
          <Title size="h3" ta="center" mb="xl">
            Quit DartMate?
          </Title>
          <Group position="center">
            <Button
              onClick={() => void ipcRenderer.send("quit-app")}
              variant="default"
            >
              Yes
            </Button>
            <Button onClick={() => void close()}>No</Button>
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

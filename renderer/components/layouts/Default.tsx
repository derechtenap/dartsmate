import { ActionIcon, AppShell, Group } from "@mantine/core";
import { IconLetterD } from "@tabler/icons-react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export const headerHeight = 40; // px
export const navbarWidth = 200; // px

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <AppShell
      header={{
        height: headerHeight,
      }}
      navbar={{
        width: navbarWidth,
        breakpoint: "xs",
        collapsed: {
          mobile: false,
          desktop: false,
        },
      }}
    >
      <AppShell.Header>
        <Group h={headerHeight} mah={headerHeight} mx="sm" w="100%">
          <ActionIcon
            gradient={{ from: "blue", to: "red", deg: 145 }}
            variant="gradient"
          >
            <IconLetterD />
          </ActionIcon>
          ...
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DefaultLayout;

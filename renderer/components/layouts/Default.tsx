import { AppShell, Navbar } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar height="100vh" p="xs" width={{ base: 150 }}>
          <Navbar.Section>TOP</Navbar.Section>
          <Navbar.Section grow mt="lg">
            MID
          </Navbar.Section>
          <Navbar.Section>FOOTER</Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default DefaultLayout;

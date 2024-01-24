import type { NextPage } from "next";
import DefaultLayout, { navbarWidth } from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";
import {
  Accordion,
  Alert,
  Button,
  Center,
  Container,
  Group,
  MantineColorScheme,
  ScrollArea,
  SegmentedControl,
  SegmentedControlProps,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { getFolderSize } from "utils/fs/getFolderSize";
import { APP_NAME, MATCHES_DIR, PROFILES_DIR } from "utils/constants";
import { readFolder } from "utils/fs/readFolder";
import { deleteFile } from "utils/fs/deleteFile";
import { notifications } from "@mantine/notifications";
import path from "path";
import { useEffect, useState } from "react";
import { filesize } from "filesize";
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";

const SettingsPage: NextPage = () => {
  const [folderSize, setFolderSize] = useState(0);
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    // keepTransitions: true,
  });

  const iconProps = {
    width: 20,
    height: 20,
  };

  const colorSchemes: SegmentedControlProps["data"] = [
    {
      label: (
        <Center style={{ gap: 10 }}>
          <IconSun {...iconProps} /> <Text>Light</Text>
        </Center>
      ),
      value: "light",
    },
    {
      label: (
        <Center style={{ gap: 10 }}>
          <IconMoon {...iconProps} /> <Text>Dark</Text>
        </Center>
      ),
      value: "dark",
    },
    {
      label: (
        <Center style={{ gap: 10 }}>
          <IconSunMoon {...iconProps} /> <Text>System</Text>
        </Center>
      ),
      value: "auto",
    },
  ];

  const getAppFolderSize = () => {
    const profilesFolderSize = getFolderSize(PROFILES_DIR);
    const matchesFolderSize = getFolderSize(MATCHES_DIR);

    setFolderSize(profilesFolderSize + matchesFolderSize);
  };

  const deleteFolderContent = (folderPath: string) => {
    try {
      const folderContent = readFolder(folderPath);

      folderContent.map((fileName) => {
        deleteFile(path.join(folderPath, fileName));
      });

      notifications.show({
        title: `Deleted all files from the folder!`,
        message: "",
      });
    } catch (err) {
      notifications.show({
        title: `Error! Something went wrong while deleting the folder!`,
        message: `Please try again in a couple of seconds.(${err as string})`,
      });
    } finally {
      getAppFolderSize();
    }
  };

  useEffect(() => {
    getAppFolderSize();
  }, []);

  return (
    <DefaultLayout isFetching={false} isLoading={false} isSuccess={true}>
      <ScrollArea.Autosize ml={navbarWidth + 1}>
        <Container w={900}>
          <PageHeader title="Settings">
            Here you can change your app settings. Some settings can be
            overridden on each page by pressing the corresponding hotkeys.
          </PageHeader>
          <Accordion variant="contained" defaultValue="general">
            <Accordion.Item value="general">
              <Accordion.Control>
                <Text fw="bold">General Preferences</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text fw="bold">Color Scheme</Text>
                <Text mb="lg">
                  Customize your {APP_NAME} experience by selecting a preferred
                  color scheme. By default, {APP_NAME} synchronizes with your
                  operating system's color scheme. You can override this
                  behavior by selecting the "Light" or "Dark" theme option.
                </Text>

                <SegmentedControl
                  color="red"
                  data={colorSchemes}
                  onChange={(newScheme) =>
                    setColorScheme(newScheme as MantineColorScheme)
                  }
                  value={colorScheme}
                />
              </Accordion.Panel>
            </Accordion.Item>
            {/*
          <Accordion.Item value="notificationsAndAlerts">
            <Accordion.Control>
              <Text fw="bold">Notifications and Alerts</Text>
            </Accordion.Control>
            <Accordion.Panel>...</Accordion.Panel>
          </Accordion.Item>
          */}
            <Accordion.Item value="dataManagement">
              <Accordion.Control>
                <Text fw="bold">Data Management</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>Here you can manage the data created by {APP_NAME}.</Text>
                <Alert
                  my="lg"
                  title="Danger Zone"
                  color="red"
                  radius="xs"
                  variant="filled"
                >
                  <Text>
                    Deleting your saved profiles or matches cannot be undone!
                    Profiles and matches currently occupy{" "}
                    {filesize(folderSize, { standard: "jedec" })} on your hard
                    disk.
                  </Text>
                  <Group mt="lg">
                    <Button
                      variant="white"
                      onClick={() => deleteFolderContent(PROFILES_DIR)}
                    >
                      Delete Profiles
                    </Button>
                    <Button
                      variant="white"
                      onClick={() => deleteFolderContent(MATCHES_DIR)}
                    >
                      Delete Matches
                    </Button>
                  </Group>
                </Alert>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </ScrollArea.Autosize>
    </DefaultLayout>
  );
};

export default SettingsPage;

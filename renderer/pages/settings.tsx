import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";
import {
  Accordion,
  Alert,
  Button,
  Group,
  Kbd,
  SegmentedControl,
  Text,
} from "@mantine/core";
import type { ColorScheme, SegmentedControlProps } from "@mantine/core";
import { useLocalStorage, useOs } from "@mantine/hooks";
import { getFolderSize } from "utils/fs/getFolderSize";
import { APP_NAME, MATCHES_DIR, PROFILES_DIR } from "utils/constants";
import { readFolder } from "utils/fs/readFolder";
import { deleteFile } from "utils/fs/deleteFile";
import { notifications } from "@mantine/notifications";
import path from "path";
import { useEffect, useState } from "react";
import { filesize } from "filesize";

const SettingsPage: NextPage = () => {
  const [folderSize, setFolderSize] = useState(0);

  const os = useOs();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
  });

  const colorSchemes: SegmentedControlProps["data"] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
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
      <PageHeader title="Settings">
        Here you can change your app settings. Some settings can be overridden
        on each page by pressing the corresponding hotkeys.
      </PageHeader>
      <Accordion variant="contained" defaultValue="general">
        <Accordion.Item value="general">
          <Accordion.Control>
            <Text fw="bold">General Preferences</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text fw="bold">Color Scheme</Text>
            <Text mb="lg">
              You can set a preferred color scheme for {APP_NAME}. By default{" "}
              {APP_NAME} uses your color scheme from the operating system. You
              can change the color scheme at any time by pressing{" "}
              <Kbd>{os !== "macos" ? "CTRL+T" : "⌘+T"}</Kbd>.
            </Text>
            <SegmentedControl
              value={colorScheme}
              onChange={(scheme) => setColorScheme(scheme as ColorScheme)}
              data={colorSchemes}
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
                {filesize(folderSize, { standard: "jedec" })} on your hard disk.
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
    </DefaultLayout>
  );
};

export default SettingsPage;

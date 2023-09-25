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
import pkg from "../../package.json";
import { useLocalStorage, useOs } from "@mantine/hooks";
import { getFolderSize } from "utils/fs/getFolderSize";
import { MATCHES_DIR, PROFILES_DIR } from "utils/constants";
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

  const getProfilesFolderSize = () => {
    const profilesFolderSize = getFolderSize(PROFILES_DIR);
    const matchesFolderSize = getFolderSize(MATCHES_DIR);

    setFolderSize(profilesFolderSize + matchesFolderSize);
  };

  const deleteFolderContent = (folder: string) => {
    try {
      const folderContent = readFolder(folder);

      folderContent.map((file) => {
        deleteFile(path.join(folder, file));
      });

      notifications.show({
        color: "blue",
        title: `Deleted all files from the folder!`,
        message: "",
      });
    } catch (err) {
      notifications.show({
        color: "red",
        title: `Error! Something went wrong while deleting the folder!`,
        message: `Please try again in a couple of seconds.(${err as string})`,
      });
    } finally {
      getProfilesFolderSize();
    }
  };

  useEffect(() => {
    getProfilesFolderSize();
  }, []);

  return (
    <DefaultLayout>
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
              You can set a preferred color scheme for {pkg.productName}. By
              default {pkg.productName} uses your color scheme from the
              operating system. You can change the color scheme at any time by
              pressing <Kbd>{os !== "macos" ? "CTRL+T" : "⌘+T"}</Kbd>.
            </Text>
            <SegmentedControl
              value={colorScheme}
              onChange={(scheme) => setColorScheme(scheme as ColorScheme)}
              color="blue"
              data={colorSchemes}
            />

            {/*
            <Text mt="xl" fw="bold">
              Toggle Fullscreen
            </Text>
            <Text mb="lg">
              Toggle between fullscreen and bordered windowed mode.
            </Text>
            <Button onClick={() => handleScreenMode()} color="blue">
              {fullscreen ? "Exit Fullscreen Mode" : "Enter Fullscreen Mode"}
            </Button>
            */}
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
            <Text>
              Here you can manage the data created by {pkg.productName}.
            </Text>
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
                  color="red"
                  onClick={() => deleteFolderContent(PROFILES_DIR)}
                >
                  Delete Profiles
                </Button>
                <Button
                  variant="white"
                  color="red"
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

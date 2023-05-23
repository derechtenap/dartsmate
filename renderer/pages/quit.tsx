import { NextPage } from "next";

import { useRouter } from "next/router";
import { ipcRenderer } from "electron";

import { Box, Button, Center, Flex, Title } from "@mantine/core";

const QuitPage: NextPage = () => {
  const router = useRouter();

  // Sends a message to the main process to quit the Electron app
  const handleQuit = () => {
    ipcRenderer.send("quit-app");
  };

  // Redirect back to the latest page, cancelling the quitting process
  const handleCancel = () => {
    router.back();
  };

  return (
    <Center h="100vh" w="100vw">
      <Box
        p="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
          borderRadius: theme.radius.md,
        })}
      >
        <Title fz="lg">Are you sure you want to exit the App?</Title>
        <Flex align="center" justify="center" gap="xl" mt="xl">
          <Button onClick={() => handleQuit()} variant="outline">
            Quit
          </Button>
          <Button onClick={() => handleCancel()}>Cancel</Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default QuitPage;

import { GetStaticProps, NextPage } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import { ipcRenderer } from "electron";

import { Box, Button, Center, Flex, Title } from "@mantine/core";

const QuitPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(["common", "quitPage"]);

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
        <Title fz="lg">{t("quitPage:quitPrompt")}</Title>
        <Flex align="center" justify="center" gap="xl" mt="xl">
          <Button onClick={() => handleQuit()} variant="outline">
            {t("dialogYes")}
          </Button>
          <Button onClick={() => handleCancel()}>{t("dialogNo")}</Button>
        </Flex>
      </Box>
    </Center>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "quitPage"])),
  },
});

export default QuitPage;

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

// All packages except `@mantine/hooks` require styles imports!
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";

// Put overrides with custom stylesheets here
import "../styles/globals.css";
import "../styles/scrollbar.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      defaultColorScheme="auto"
      theme={{
        primaryColor: "red",
      }}
    >
      <Notifications position="top-right" limit={5} />
      <ModalsProvider>
        <Component {...pageProps} />
      </ModalsProvider>
    </MantineProvider>
  );
};

export default appWithTranslation(App);

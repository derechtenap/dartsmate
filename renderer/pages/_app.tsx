import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { DehydratedState } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import ProfilesContextProvider from "contexts/ProfilesContextProvider";

// All packages except `@mantine/hooks` require styles imports!
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";

// Put overrides with custom stylesheets here
import "../styles/globals.css";
import "../styles/scrollbar.css";

const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: DehydratedState;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        defaultColorScheme="auto"
        theme={{
          primaryColor: "red",
        }}
      >
        <Notifications position="top-right" limit={5} />
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ModalsProvider>
            <ProfilesContextProvider>
              <Component {...pageProps} />
            </ProfilesContextProvider>
          </ModalsProvider>
        </HydrationBoundary>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);

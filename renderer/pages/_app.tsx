import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { DehydratedState } from "@tanstack/react-query";
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

const App = ({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: DehydratedState;
}>) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        defaultColorScheme="auto"
        theme={{
          primaryColor: "red",
        }}
      >
        <Notifications position="top-right" limit={5} />
        <Hydrate state={pageProps.dehydratedState}>
          <ModalsProvider>
            <Component {...pageProps} />
          </ModalsProvider>
        </Hydrate>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);

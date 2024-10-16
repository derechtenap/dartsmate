import type { AppProps } from "next/app";
import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
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
  // See: https://tanstack.com/query/latest/docs/framework/react/guides/ssr#full-nextjs-pages-router-example
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          /*
           * The query and mutations need to run regardless of network status,
           * since the data is fetched locally from the client's system.
           */
          queries: {
            networkMode: "always",
            staleTime: Infinity, // Never refetch without mutation
          },
          mutations: {
            networkMode: "always",
          },
        },
      })
  );

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
            <Component {...pageProps} />
          </ModalsProvider>
        </HydrationBoundary>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);

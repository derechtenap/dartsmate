import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { DehydratedState } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { appWithTranslation } from "next-i18next";

/*
 *
 * Import styles of mantine packages that are installed here!
 * All packages except `@mantine/hooks` require styles imports!
 *
 */
import "@mantine/core/styles.css";

// Custom css style overrides
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
        <Notifications limit={5} position="top-right" />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);

import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
// import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
// import { checkAppFolders } from "utils/fs/checkAppFolders";
import { useRouter } from "next/router";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { DehydratedState } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { APP_NAME } from "utils/constants";
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
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  /*
  // Store color scheme in the `localStorage`
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  // Change color scheme by pressing `ctrl + t`
  useHotkeys([["ctrl+t", () => toggleColorScheme()]]);
  */

  useEffect(() => {
    // Check if all necessary app folders are already created
    // void checkAppFolders();
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
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
    </>
  );
};

export default appWithTranslation(App);

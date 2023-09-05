import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import pkg from "../../package.json";
import "../styles/globals.css";
import "../styles/scrollbar.css";
import { useEffect, useState } from "react";
import { checkAppFolders } from "utils/fs/checkAppFolders";
import { useRouter } from "next/router";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { DehydratedState } from "@tanstack/react-query";

const App = ({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: DehydratedState;
}>) => {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

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

  useEffect(() => {
    // Check if all necessary app folders are already created
    void checkAppFolders();
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>{pkg.productName}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
            }}
          >
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </MantineProvider>
        </ColorSchemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default App;

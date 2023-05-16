import type { AppProps } from "next/app";
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";

import { APP_NAME } from "utils/constants";

import "../styles/globals.css";
import "../styles/scrollbar.css";
import "@splidejs/react-splide/css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const appName = APP_NAME;

const App = ({ Component, pageProps }: AppProps) => {
  // Will return `light` if the `window.matchMedia()` API is not available
  const preferredColorScheme = useColorScheme();

  // Store color scheme in the `localStorage`
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  // Change color scheme by pressing `ctrl + t`
  useHotkeys([["ctrl+t", () => toggleColorScheme()]]);

  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
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
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <Component {...pageProps} />
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;

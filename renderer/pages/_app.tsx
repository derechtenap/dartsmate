import type { AppProps } from "next/app";
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";

import { APP_NAME } from "utils/constants";

import "../styles/globals.css";
import "../styles/scrollbar.css";
import "@splidejs/react-splide/css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const appName = APP_NAME;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <Component {...pageProps} />
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
};

export default App;

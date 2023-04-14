import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";
import "../styles/scrollbar.css";
import "@splidejs/react-splide/css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;

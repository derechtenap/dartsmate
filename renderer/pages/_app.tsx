import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/scrollbar.css";
import "@splidejs/react-splide/css";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;

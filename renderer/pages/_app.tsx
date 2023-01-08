import { useEffect } from "react";
import type { AppProps } from "next/app";

import "../styles/main.scss";

const App = ({ Component, pageProps }: AppProps) => {
  // Fix: Server Error `ReferenceError: document is not defined`
  // Wait until the DOM is ready and then require the bootstrap js
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
};

export default App;

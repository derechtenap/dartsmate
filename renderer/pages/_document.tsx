import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

const Document = () => {
  return (
    <Html>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body id="draggable">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

import React from "react";
import { useTranslation } from "next-i18next";

import { getStaticPaths, makeStaticProperties } from "../../../lib/get-static";
import DefaultLayout from "@/components/layouts/Default";

const NewGamePage = () => {
  const {
    // t,
    i18n: { language: locale },
  } = useTranslation();

  console.info("locale:", locale);

  return <DefaultLayout withNavbarOpen>New Game Route</DefaultLayout>;
};

export default NewGamePage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

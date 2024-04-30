import React from "react";
import { useTranslation } from "next-i18next";

import { getStaticPaths, makeStaticProperties } from "../../lib/get-static";
import DefaultLayout from "@/components/layouts/Default";

const IndexPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  return <DefaultLayout withNavbarOpen>Index Route ({locale})</DefaultLayout>;
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

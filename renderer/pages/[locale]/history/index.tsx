import React from "react";
import { useTranslation } from "next-i18next";

import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout from "@/components/layouts/Default";

const HistoryPage = () => {
  const {
    // t,
    i18n: { language: locale },
  } = useTranslation();

  return <DefaultLayout withNavbarOpen>History Route ({locale})</DefaultLayout>;
};

export default HistoryPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import DefaultLayout from "@/components/layouts/Default";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n, useTranslation } from "next-i18next";

const EditProfile: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation(["settingsPage"]);

  return <DefaultLayout>...</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Refetch locales automatically when in dev mode
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [], // Indicates that no page needs be created at build time
    fallback: "blocking",
  };
};

export default EditProfile;

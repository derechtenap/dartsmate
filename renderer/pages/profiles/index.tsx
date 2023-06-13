import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n, useTranslation } from "next-i18next";

import DefaultLayout from "@/components/layouts/Default";

const ProfilesPage: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation(["common"]);
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

export default ProfilesPage;

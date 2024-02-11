import type { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18next from "../../next-i18next.config";

export const getI18nPaths = () => {
  return i18next.i18n.locales.map((locale) => ({
    params: {
      locale,
    },
  }));
};

export const getStaticPaths = () => {
  return {
    fallback: false,
    paths: getI18nPaths(),
  };
};

export const getI18nProperties = async (
  context: GetServerSidePropsContext,
  namespaces = ["common"]
) => {
  const locale = context?.params?.locale ?? i18next.i18n.defaultLocale;
  return {
    ...(await serverSideTranslations(locale as string, namespaces)),
  };
};

export const makeStaticProperties = (namespaces: string[] = []) => {
  return async function (context: GetServerSidePropsContext) {
    return {
      props: await getI18nProperties(context, namespaces),
    };
  };
};

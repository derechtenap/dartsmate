import { useEffect } from "react";

import type { GetStaticProps, NextPage } from "next";

import { useRouter } from "next/router";

import { Center, Divider, Flex, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import pkg from "../../package.json";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "next-i18next";
import DefaultLayout from "@/components/layouts/Default";

const IndexPage: NextPage = () => {
  const { push } = useRouter();

  const [language, setLanguage] = useLocalStorage<string>({
    key: "app-language",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (language) {
      void push("/", undefined, { locale: language });
    }

    // Set the app language to the client OS language only if no language is set in the app
    if (!language && !window.localStorage.getItem("app-language")) {
      const defaultLanguage = i18n?.language || "en";

      // Check if the OS language is supported by the app, otherwise use the default language
      if (i18n?.languages.includes(window.navigator.language)) {
        setLanguage(window.navigator.language);
      } else {
        setLanguage(defaultLanguage);
      }
    }
  }, [language]);

  // Show a small splash screen if the language is not loaded yet...
  if (!language)
    return (
      <Center h="100vh">
        <Title color="dimmed" tt="uppercase" fs="italic" size={100}>
          {pkg.productName}
        </Title>
      </Center>
    );

  // TODO: Currently only shows a logo... Show the user more useful content
  return (
    <DefaultLayout>
      <Center h="100vh">
        <Flex direction="column">
          <Title tt="uppercase" fs="italic" size={100} lh={0.6}>
            {pkg.productName}
          </Title>
          <Divider
            my="xs"
            color="blue"
            variant="dashed"
            label={pkg.version}
            labelPosition="right"
          />
        </Flex>
      </Center>
    </DefaultLayout>
  );
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

export default IndexPage;

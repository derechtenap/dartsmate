import { useEffect } from "react";

import type { GetStaticProps, NextPage } from "next";

import { useRouter } from "next/router";

import DefaultLayout from "@/components/layouts/Default";

import { Carousel } from "@mantine/carousel";
import { Center, Text, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import pkg from "../../package.json";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const IndexPage: NextPage = () => {
  const { t } = useTranslation(["indexPage"]);
  const { push } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, setLanguage] = useLocalStorage<string>({
    key: "app-language",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (language) {
      void push("/", undefined, { locale: language });
    }
  }, [language]);

  if (!language) return <></>;

  return (
    <DefaultLayout>
      <div style={{ height: "100%", display: "flex", alignContent: "center" }}>
        <Carousel
          withControls={false}
          withIndicators
          height="100%"
          sx={{ flex: 1 }}
          loop
          orientation="vertical"
        >
          <Carousel.Slide>
            <Center
              h="100%"
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2rem",
              }}
              p="xl"
            >
              <Title
                size="3rem"
                weight={900}
                sx={{ textTransform: "uppercase" }}
              >
                {t("welcomeSlideTitle", { APP_NAME: pkg.productName })}
              </Title>
              <Text weight={600} fz="1.5rem">
                {t("welcomeSlideParagraph")}
              </Text>
            </Center>
          </Carousel.Slide>
        </Carousel>
      </div>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "indexPage"])),
  },
});

export default IndexPage;

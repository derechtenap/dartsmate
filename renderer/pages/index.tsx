import type { GetStaticProps, NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";

import { Carousel } from "@mantine/carousel";
import { Center, Text, Title } from "@mantine/core";

import { APP_NAME } from "utils/constants";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const IndexPage: NextPage = () => {
  const { t } = useTranslation(["indexPage"]);

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
                {t("welcomeSlideTitle", { APP_NAME: APP_NAME as string })}
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
    ...(await serverSideTranslations(locale ?? "en", ["indexPage"])),
  },
});

export default IndexPage;

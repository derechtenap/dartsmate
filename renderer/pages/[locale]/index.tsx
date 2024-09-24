import React from "react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout from "@/components/layouts/Default";
import { Box, Stack, Title } from "@mantine/core";
import useProfileContext from "hooks/useProfiles";
import DarkenedText from "@/components/content/DarkenedText";
import HorizontalScrollContainer from "@/components/content/horizontalScroll/HorizontalScrollContainer";

const IndexPage = () => {
  const { t } = useTranslation();
  const { defaultProfile } = useProfileContext();

  if (defaultProfile) {
    return (
      <DefaultLayout withNavbarOpen={false}>
        <Stack>
          <Box component="header">
            <Title fz="h1">
              {t("greetingText", { FIRST_NAME: defaultProfile.name.firstName })}
            </Title>
            <DarkenedText>{t("greetingSubtext")}</DarkenedText>
          </Box>
          <HorizontalScrollContainer></HorizontalScrollContainer>
        </Stack>
      </DefaultLayout>
    );
  }
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout from "@/components/layouts/Default";
import { Box, Stack, Title } from "@mantine/core";
import DarkenedText from "@/components/content/DarkenedText";
import HorizontalScrollContainer from "@/components/content/horizontalScroll/HorizontalScrollContainer";
import { useDefaultProfile } from "hooks/useDefaultProfile";

const IndexPage = () => {
  const { t } = useTranslation();
  const { data: defaultProfile } = useDefaultProfile();

  return (
    <DefaultLayout withNavbarOpen={false}>
      <Stack>
        {defaultProfile && (
          <Box component="header">
            <Title fz="h1">
              {t("greetingText", { FIRST_NAME: defaultProfile.name.firstName })}
            </Title>
            <DarkenedText>{t("greetingSubtext")}</DarkenedText>
          </Box>
        )}
        <HorizontalScrollContainer></HorizontalScrollContainer>
      </Stack>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

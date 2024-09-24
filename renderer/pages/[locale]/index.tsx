import React from "react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout from "@/components/layouts/Default";
import { Grid, Title } from "@mantine/core";
import useProfileContext from "hooks/useProfiles";
import DarkenedText from "@/components/content/DarkenedText";

const IndexPage = () => {
  const { t } = useTranslation();
  const { defaultProfile } = useProfileContext();

  if (defaultProfile) {
    return (
      <DefaultLayout withNavbarOpen={false}>
        <Grid p="xs">
          <Grid.Col span={12}>
            <Title fz="h1">
              {t("greetingText", { FIRST_NAME: defaultProfile.name.firstName })}
            </Title>
            <DarkenedText>{t("greetingSubtext")}</DarkenedText>
          </Grid.Col>
        </Grid>
      </DefaultLayout>
    );
  }
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

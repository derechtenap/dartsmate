import React from "react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "../../lib/get-static";
import DefaultLayout from "@/components/layouts/Default";
import useDefaultProfileContext from "hooks/useDefaultProfile";
import { Text, Title } from "@mantine/core";

const IndexPage = () => {
  const { t } = useTranslation();
  const { defaultProfile } = useDefaultProfileContext();

  if (defaultProfile) {
    return (
      <DefaultLayout withNavbarOpen>
        <Title>
          {t("greetingText", { FIRST_NAME: defaultProfile.name.firstName })}
        </Title>
        <Text>{t("greetingSubtext")}</Text>
      </DefaultLayout>
    );
  }
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

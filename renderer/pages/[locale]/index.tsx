import React from "react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "../../lib/get-static";
import DefaultLayout from "@/components/layouts/Default";
import { Title } from "@mantine/core";
import useDefaultProfileContext from "hooks/useDefaultProfile";

const IndexPage = () => {
  const { t } = useTranslation();
  const { defaultProfile } = useDefaultProfileContext();

  if (defaultProfile) {
    return (
      <DefaultLayout withNavbarOpen>
        <Title mb="lg">
          {t("welcomeGreeting", { FIRST_NAME: defaultProfile.name.firstName })}
        </Title>
      </DefaultLayout>
    );
  }
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

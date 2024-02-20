import React from "react";
import { useTranslation } from "next-i18next";

import { getStaticPaths, makeStaticProperties } from "../../lib/get-static";
import { Container, Title, Text, Button } from "@mantine/core";
import { useRouter } from "next/router";

const IndexPage = () => {
  const {
    i18n: { language: locale },
    t,
  } = useTranslation();
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    void router.replace("[locale]", newLocale);
  };

  return (
    <Container>
      <Title>{t("home")}</Title>
      <Text>
        Locale is: <code>{locale}</code>
      </Text>
      <Button onClick={() => changeLocale(locale === "en" ? "de" : "en")}>
        Switch Locale
      </Button>
    </Container>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

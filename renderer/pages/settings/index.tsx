import type { NextPage } from "next";
import {
  Center,
  Grid,
  Title,
  UnstyledButton,
  Paper,
  Button,
  BackgroundImage,
  Badge,
} from "@mantine/core";

import DefaultLayout from "@components/layout/DefaultLayout";
import { getStaticPaths, makeStaticProperties } from "lib/getStatic";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "@components/LanguageSwitcher";

const SettingsPage: NextPage = (): JSX.Element => {
  const {
    i18n: { language: locale },
    t,
  } = useTranslation();

  return (
    <DefaultLayout>
      <Grid px="xl" py="lg">
        <Grid.Col span={5}>
          <Title size="h3">Quick Play</Title>
        </Grid.Col>
        <Grid.Col span="auto">
          <Title size="h3">Latest Activity</Title>
          <LanguageSwitcher />
          {t("common:testMessage")}
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default SettingsPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

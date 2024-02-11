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

const IndexPage: NextPage = (): JSX.Element => {
  const {
    i18n: { language: locale },
    t,
  } = useTranslation();

  return (
    <DefaultLayout>
      <Grid px="xl" py="lg">
        <Grid.Col span={5}>
          <Title size="h3">Quick Play</Title>

          <Grid mt="lg">
            <Grid.Col span={12}>
              <UnstyledButton w="100%">
                <Paper h={200}>
                  <BackgroundImage
                    radius="md"
                    h="100%"
                    src="https://images.unsplash.com/photo-1579019163248-e7761241d85a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  >
                    <Center h="100%">
                      <Badge
                        gradient={{ from: "red", to: "blue", deg: 140 }}
                        size="xl"
                        variant="gradient"
                      >
                        501 Double-Out
                      </Badge>
                    </Center>
                  </BackgroundImage>
                </Paper>
              </UnstyledButton>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button fullWidth size="compact-sm">
                Score Training
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button fullWidth size="compact-sm">
                Around the Clock
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button fullWidth size="compact-sm">
                Cricket
              </Button>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span="auto">
          <Title size="h3">Latest Activity</Title>
          <LanguageSwitcher />
          {t("common:goToHome")}
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

import type { NextPage } from "next";
import { Center, Divider, Stack, Title } from "@mantine/core";
import pkg from "../../package.json";
import DefaultLayout from "@/components/layouts/Default";
import { APP_NAME } from "utils/constants";

const IndexPage: NextPage = () => {
  const APP_VERSION = pkg.version;

  /*
   *
   * TODO: Enhance user experience by expanding content beyond just the
   * logo display.
   *
   */
  return (
    <DefaultLayout isFetching={false} isLoading={false} isSuccess={true}>
      <Center h="100%">
        <Stack spacing="xs">
          <Title tt="uppercase" fs="italic" size={100} lh={0.8}>
            {APP_NAME}
          </Title>
          <Divider label={APP_VERSION} labelPosition="right" />
        </Stack>
      </Center>
    </DefaultLayout>
  );
};

export default IndexPage;

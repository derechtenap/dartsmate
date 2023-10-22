import type { NextPage } from "next";
import { Center, Divider, Flex, Title } from "@mantine/core";
import pkg from "../../package.json";
import DefaultLayout from "@/components/layouts/Default";
import { APP_NAME } from "utils/constants";

const IndexPage: NextPage = () => {
  // TODO: Currently only shows a logo... Show the user more useful content
  return (
    <DefaultLayout isFetching={false} isLoading={false} isSuccess={true}>
      <Center h="100%">
        <Flex direction="column">
          <Title tt="uppercase" fs="italic" size={100} lh={0.6}>
            {APP_NAME}
          </Title>
          <Divider my="xs" label={pkg.version} labelPosition="right" />
        </Flex>
      </Center>
    </DefaultLayout>
  );
};

export default IndexPage;

import type { NextPage } from "next";
import { Center, Divider, Flex, Title } from "@mantine/core";
import pkg from "../../package.json";
import DefaultLayout from "@/components/layouts/Default";

const IndexPage: NextPage = () => {
  // TODO: Currently only shows a logo... Show the user more useful content
  return (
    <DefaultLayout>
      <Center h="100%">
        <Flex direction="column">
          <Title tt="uppercase" fs="italic" size={100} lh={0.6}>
            {pkg.productName}
          </Title>
          <Divider my="xs" label={pkg.version} labelPosition="right" />
        </Flex>
      </Center>
    </DefaultLayout>
  );
};

export default IndexPage;

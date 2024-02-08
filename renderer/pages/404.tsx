import DefaultLayout from "@components/layout/DefaultLayout";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { IconReceiptOff } from "@tabler/icons-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Error404Page: NextPage = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
      <Center h="100%" ta="center">
        <Stack gap="lg">
          <IconReceiptOff
            size={64}
            style={{
              margin: "0 auto",
            }}
          />
          <Title>This shouldn't have happened: Error 404</Title>
          <Text mb="lg">
            We couldn't find the resource you are looking for.
            <br /> If you think this is an error, please contact us.
          </Text>
          <Button mx="auto" w="fit-content" onClick={() => void router.back()}>
            Go Back
          </Button>
        </Stack>
      </Center>
    </DefaultLayout>
  );
};

export default Error404Page;

import { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";

import { Carousel } from "@mantine/carousel";
import { Center, Text, Title } from "@mantine/core";

import { APP_NAME } from "utils/constants";

const IndexPage: NextPage = () => {
  return (
    <DefaultLayout>
      <div style={{ height: "100%", display: "flex", alignContent: "center" }}>
        <Carousel
          withControls={false}
          withIndicators
          height="100%"
          sx={{ flex: 1 }}
          loop
          orientation="vertical"
        >
          <Carousel.Slide>
            <Center
              h="100%"
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2rem",
              }}
              p="xl"
            >
              <Title
                size="3rem"
                weight={900}
                sx={{ textTransform: "uppercase" }}
              >
                Welcome to {APP_NAME}
              </Title>
              <Text weight={600} fz="1.5rem">
                Lets start a new game!
              </Text>
            </Center>
          </Carousel.Slide>
        </Carousel>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;

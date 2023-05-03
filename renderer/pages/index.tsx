import { NextPage } from "next";

import Layout from "@/components/layouts/MainMenuLayout";
import MainMenuNav from "@/components/navs/mainMenu/Nav";
import NewGameCta from "@/components/slides/NewGameCta";

import {
  Splide as Carousel,
  SplideSlide as Slide,
} from "@splidejs/react-splide";

import { mainMenuSlidesOptions } from "utils/ui/SlideOptions";

const IndexPage: NextPage = () => {
  return (
    <Layout title="DartMate">
      <Carousel
        aria-label="Menu"
        className="h-4/6 w-full"
        options={mainMenuSlidesOptions}
      >
        <Slide>
          <NewGameCta />
        </Slide>
      </Carousel>
      <MainMenuNav />
    </Layout>
  );
};

export default IndexPage;

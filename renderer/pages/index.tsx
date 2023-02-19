import { NextPage } from "next";

import Layout from "@/components/layouts/MainMenuLayout";
import MainMenuNav from "@/components/navs/mainMenu/Nav";
import NewGameCta from "@/components/slides/NewGameCta";
import UnfinishedGameCta from "@/components/slides/UnfinishedGameCta";

import {
  Splide as Carousel,
  SplideSlide as Slide,
} from "@splidejs/react-splide";

import { mainMenuSlidesOptions } from "utils/ui/SlideOptions";
import { playerList } from "utils/ui/testData";

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
        <Slide>
          <UnfinishedGameCta playerList={playerList} savedAt={new Date()} />
        </Slide>
      </Carousel>
      <MainMenuNav />
    </Layout>
  );
};

export default IndexPage;

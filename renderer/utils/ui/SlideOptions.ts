import { Options } from "@splidejs/react-splide";

// https://splidejs.com/guides/options/#options

export const mainMenuSlidesOptions: Options = {
  autoplay: true,
  arrows: false,
  direction: "ttb",
  height: "100%",
  paginationDirection: "ttb",
  perPage: 1,
  interval: 10000, // Duration the a slide is visible
  speed: 2000, // Duration it takes to switch between two slides
  type: "loop",
};

import {
  HiCog,
  HiHome,
  HiOutlineFolderOpen,
  HiOutlineInformationCircle,
  HiPlusCircle,
  HiSortAscending,
  HiUserGroup,
  HiXCircle,
} from "react-icons/hi";

export const about = {
  href: "/about",
  icon: <HiOutlineInformationCircle />,
  name: "About",
};

export const home = {
  href: "/",
  icon: <HiHome />,
  name: "Home",
};

export const openSaveDir = {
  href: "#",
  icon: <HiOutlineFolderOpen />,
  name: "Open Save Directory",
};

export const profiles = {
  href: "/profiles",
  icon: <HiUserGroup />,
  name: "Profiles",
};

export const quit = {
  href: "/quit",
  icon: <HiXCircle />,
  name: "Quit",
};

export const ranking = {
  href: "/ranking",
  icon: <HiSortAscending />,
  name: "Ranking",
};

export const settings = {
  href: "/settings",
  icon: <HiCog />,
  name: "Settings",
};

export const newGame = {
  href: "/lobby",
  icon: <HiPlusCircle />,
  name: "New Game",
};

export const mainNavLinks = [newGame, profiles, quit];
export const optionsNavLinks = [];
export const sidebarLinks = [home, profiles, ranking];

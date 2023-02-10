import {
  HiCog,
  HiInboxIn,
  HiOutlineFolderOpen,
  HiOutlineInformationCircle,
  HiPlusCircle,
  HiSortAscending,
  HiUserGroup,
  HiXCircle,
} from "react-icons/hi";

// TODO: Add optional onClick prop e.g. for the openSaveDir

export const about = {
  href: "/about",
  icon: <HiOutlineInformationCircle />,
  name: "About",
};

const loadGame = {
  href: "/loadGame",
  icon: <HiInboxIn />,
  name: "Load Game",
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

export const mainNavLinks = [newGame, loadGame, profiles, ranking, quit];
export const optionsNavLinks = [openSaveDir, about, settings];

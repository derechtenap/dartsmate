import {
  HiInboxIn,
  HiPlusCircle,
  HiSortAscending,
  HiUserGroup,
  HiXCircle,
} from "react-icons/hi";

import Card from "./Card";

const links = [
  {
    icon: <HiPlusCircle />,
    name: "New Game",
    href: "/lobby",
  },
  {
    icon: <HiInboxIn />,
    name: "Load Game",
    href: "/loadGame",
  },
  {
    icon: <HiUserGroup />,
    name: "Profiles",
    href: "/profiles",
  },
  {
    icon: <HiSortAscending />,
    name: "Ranking",
    href: "/ranking",
  },
  {
    icon: <HiXCircle />,
    name: "Quit",
    href: "/quit",
  },
];

const MainMenuNav = () => {
  return (
    <ul
      className="menu menu-horizontal col-start-2 col-end-13 row-start-5 row-end-7 items-center gap-12 text-6xl"
      role="navigation"
    >
      {links.map((link) => (
        <li className="rounded-lg first:scale-110" key={link.href}>
          <Card href={link.href}>
            {link.icon}
            <span className="text-lg opacity-95">{link.name}</span>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default MainMenuNav;

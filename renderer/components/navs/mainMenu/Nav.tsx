import { ReactElement } from "react";
import { HiPlusCircle, HiUserGroup, HiXCircle } from "react-icons/hi";
import NavLink from "./NavLink";

const links: navLink[] = [
  {
    href: "/lobby",
    name: "New Game",
    icon: <HiPlusCircle />,
  },
  {
    href: "/profiles",
    name: "Profiles",
    icon: <HiUserGroup />,
  },
  {
    href: "/quit",
    name: "Quit",
    icon: <HiXCircle />,
  },
];

const MainMenuNav = () => {
  return (
    <nav className="h-2/6 bg-base-200 font-semibold">
      <ul className="flex h-full cursor-pointer justify-evenly">
        {links.map((link: navLink) => (
          <NavLink
            href={link.href}
            icon={link.icon as ReactElement}
            key={link.name}
            name={link.name}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MainMenuNav;

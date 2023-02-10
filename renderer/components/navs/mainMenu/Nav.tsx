import Card from "./Card";

import { mainNavLinks as links } from "utils/ui/navigation";

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

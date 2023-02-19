import { mainNavLinks as links } from "utils/ui/navigation";
import NavLink from "./NavLink";

const MainMenuNav = () => {
  return (
    <nav className="h-2/6 select-none bg-base-200 font-semibold">
      <ul className="flex h-full cursor-pointer justify-evenly">
        {links.map((link) => (
          <NavLink
            href={link.href}
            icon={link.icon}
            key={link.name}
            name={link.name}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MainMenuNav;

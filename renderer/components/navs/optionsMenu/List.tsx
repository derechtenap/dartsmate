import { optionsNavLinks as links } from "utils/ui/navigation";

const List = () => {
  return (
    <ul
      className="flex flex-row justify-center gap-4 text-xl text-white"
      role="navigation"
    >
      {links.map((link) => (
        <li className="cursor-pointer" key={link.href}>
          {link.icon}
        </li>
      ))}
    </ul>
  );
};

export default List;

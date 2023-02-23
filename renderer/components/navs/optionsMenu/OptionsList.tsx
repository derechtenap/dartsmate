import Link from "next/link";
import { optionsNavLinks as links } from "utils/ui/navigation";

const List = () => {
  return (
    <nav className="flex justify-center text-xl">
      <ul className="cursor-pointer text-primary-content">
        {links.map((link) => (
          <Link href={link.href} key={link.name}>
            <li className="p-4 transition-all hover:scale-125 hover:bg-primary hover:text-white">
              {link.icon}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default List;

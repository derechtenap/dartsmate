import Link from "next/link";
import { useRouter } from "next/router";
import { HiHome, HiUserGroup, HiXCircle } from "react-icons/hi";

const Sidebar = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  const home: navLink = {
    href: "/",
    name: "Home",
    icon: <HiHome />,
  };

  const links: navLink[] = [
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

  return (
    <aside className="h-full w-16 bg-base-300 text-white">
      <nav className="flex justify-center text-xl">
        <ul className="cursor-pointer text-primary-content">
          <Link href={home.href}>
            <li className="p-4 transition-all hover:scale-125 hover:bg-primary hover:text-white">
              {home.icon}
            </li>
          </Link>
          {links.map((link: navLink) => (
            <Link href={link.href} key={link.name}>
              <li
                className={`p-4 transition-all hover:scale-125 hover:bg-primary hover:text-white ${
                  currentPath === link.href ? "scale-125 text-white" : ""
                }`}
              >
                {link.icon}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

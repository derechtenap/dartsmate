import Link from "next/link";
import { useRouter } from "next/router";
import { home, mainNavLinks as links, settings } from "utils/ui/navigation";
const Sidebar = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <aside className="h-full w-16 bg-base-300 text-white">
      <nav className="flex justify-center text-xl">
        <ul className="cursor-pointer text-primary-content">
          <Link href={home.href}>
            <li className="p-4 transition-all hover:scale-125 hover:bg-primary hover:text-white">
              {home.icon}
            </li>
          </Link>
          {links.map((link) => (
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
          <Link href={settings.href}>
            <li className="p-4 transition-all hover:scale-125 hover:bg-primary hover:text-white">
              {settings.icon}
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

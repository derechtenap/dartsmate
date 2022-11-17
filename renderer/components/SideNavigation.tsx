import Link from "next/link";

type Route = { name: string; link: string };

const routes: {
  name: string;
  link: string;
}[] = [
  { name: "New Game", link: "/gameLobby" },
  { name: "Previous Games", link: "/previousGames" },
  { name: "Profile", link: "/profile" },
  { name: "Settings", link: "/settings" },
];

const SideNavigation = () => {
  return (
    <nav className="p-4 h-full">
      <Link href="/">
        <h1 className="text-xl text-center tracking-wide">DartMate</h1>
      </Link>
      <ul className="mt-4">
        {routes.map((route: Route) => (
          <li className="mt-2" key={route.name}>
            <Link href={route.link}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;

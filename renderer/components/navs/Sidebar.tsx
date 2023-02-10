import Link from "next/link";

import {
  settings as settingsLink,
  sidebarLinks as links,
} from "utils/ui/navigation";

const Sidebar = () => {
  return (
    <aside className="col-span-1 row-span-6 flex h-screen flex-col content-between items-center bg-primary p-2 text-3xl text-secondary">
      <ul className="rounded-box mt-4 flex w-full flex-col items-center gap-6 py-4">
        {links.map((link) => (
          <Link key={link.name} href={link.href}>
            <div
              className="tooltip tooltip-right cursor-pointer transition-colors hover:text-white"
              data-tip={link.name}
            >
              {link.icon}
            </div>
          </Link>
        ))}
      </ul>
      <ul className="mt-auto mb-4 flex w-full justify-center border-t pt-4">
        <li>
          <Link href={settingsLink.href}>
            <div
              className="tooltip tooltip-right cursor-pointer transition-colors hover:text-white"
              data-tip={settingsLink.name}
            >
              {settingsLink.icon}
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

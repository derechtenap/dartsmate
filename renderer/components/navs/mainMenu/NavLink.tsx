import Link from "next/link";

type Props = {
  href: string;
  icon: JSX.Element;
  name: string;
};

const NavLink = ({ href, icon, name }: Props) => {
  return (
    <Link href={href}>
      <li className="flex h-full flex-1 flex-col items-center justify-center text-6xl text-primary-content transition-all first:bg-primary-focus hover:bg-primary hover:text-white">
        {icon} <span className="mt-4 block text-2xl">{name}</span>
      </li>
    </Link>
  );
};

export default NavLink;

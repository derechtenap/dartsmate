import {
  HiCog,
  HiOutlineFolderOpen,
  HiOutlineInformationCircle,
} from "react-icons/hi";

const List = () => {
  const Links = [
    {
      icon: <HiOutlineFolderOpen />,
      name: "Open Save Directory",
      href: "#",
    },
    {
      icon: <HiOutlineInformationCircle />,
      name: "About",
      href: "/about",
    },
    {
      icon: <HiCog />,
      name: "Settings",
      href: "/settings",
    },
  ];
  return (
    <ul
      className="flex flex-row justify-center gap-4 text-xl text-white"
      role="navigation"
    >
      {Links.map((link) => (
        <li className="cursor-pointer" key={link.href}>
          {link.icon}
        </li>
      ))}
    </ul>
  );
};

export default List;

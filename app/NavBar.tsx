"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
const NavBar = () => {
  const currentpath = usePathname();
  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((item) => (
          <Link
            key={item.href}
            className={classNames({
              "text-zinc-900": item.href === currentpath,
              "text-zinc-500": item.href === currentpath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={item.href}
          >
            {item.lable}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

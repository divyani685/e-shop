import { Redressed } from "next/font/google";
import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });
const NavBar = () => {
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className={
              "flex justify-between items-center gap-10 overflow-hidden"
            }
          >
            <Link
              href="/"
              className={`${redressed.className} font-bold text-xl`}
            >
              E-Shop
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex sm:gap-5 gap-8 items-center">
              <CartCount />
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;

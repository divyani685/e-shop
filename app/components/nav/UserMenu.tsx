"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setToken, getUser, logout } = useAuth();
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const handleLogOut = useCallback(() => {}, []);
  return (
    <>
      <div className=" z-30  ">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {!isOpen ? null : (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-2 top-16 text-sm flex flex-col cursor-pointer ">
            <div>
              <Link href="/orders">
                <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
              </Link>
              <Link href={"/admin"}>
                <MenuItem onClick={() => {}}>Admin Dashboard</MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  toggleOpen(), handleLogOut;
                }}
              >
                LogOut
              </MenuItem>
            </div>
            <div>
              <Link href="/register">
                <MenuItem onClick={toggleOpen}>Register</MenuItem>
              </Link>
              <Link href="/login">
                <MenuItem onClick={toggleOpen}>Login</MenuItem>
              </Link>
            </div>
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;

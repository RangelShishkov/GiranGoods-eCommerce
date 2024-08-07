import React from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCartSimple } from "react-icons/pi";

const Header = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className=" ">
          <Logo width={160} height={60} />
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-sm focus-within:border-1 focus-within:border-black pl-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full bg-cyan-300">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-2xl cursor-pointer">
            <PiShoppingCartSimple />
          </div>

          <div className="text-xl cursor-pointer">
            <FaRegUser />
          </div>

          <div>
            <button className="px-2 py-1 rounded-full text-white bg-cyan-300 hover:bg-cyan-400">Login</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

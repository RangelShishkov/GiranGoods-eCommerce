import React from "react";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";


const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
    <aside className="bg-white min-h-full w-full max-w-[15rem] shadow-md">
      {/* User Info Section */}
      <div className="h-32 bg-cyan-500 flex flex-col justify-center items-center">
        <div className="text-4xl text-white cursor-pointer flex justify-center">
          <FaRegUser />
        </div>
        <p className="mt-2 text-white text-base">
          Hello,{" "}
          <span className="capitalize font-semibold">{user?.name}</span>
        </p>
        <p className="text-sm text-white opacity-75">{user?.role}</p>
      </div>
        {/* Navigation Links */}
    <nav className="p-4 space-y-2">
      <Link
        to={"all-users"}
        className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-cyan-600 transition-colors"
      >
        All Users
      </Link>
      <Link
        to={"all-products"}
        className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-cyan-600 transition-colors"
      >
        All Products
      </Link>
      <Link
        to={"all-orders"}
        className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-cyan-600 transition-colors"
      >
        All Orders
      </Link>
    </nav>
  </aside>
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};
export default AdminPanel;

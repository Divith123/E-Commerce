"use client";

import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaTable, FaRegUser, FaGear, FaBagShopping, FaBars } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import Link from "next/link";

// Define sidebar items as an array of objects for easier management
const sidebarItems = [
  {
    icon: <MdDashboard />,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: <FaBagShopping />,
    label: "Orders",
    href: "/admin/orders",
  },
  {
    icon: <FaTable />,
    label: "Products",
    href: "/admin/products",
  },
  {
    icon: <MdCategory />,
    label: "Categories",
    href: "/admin/categories",
  },
  {
    icon: <FaRegUser />,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: <FaGear />,
    label: "Settings",
    href: "/admin/settings",
  },
  {
    icon: <MdCategory />,
    label: "Reports",
    href: "/admin/reports",
  },
  {
    icon: <FaRegUser />,
    label: "Profile",
    href: "/admin/profile",
  },
  {
    icon: <FaGear />,
    label: "Logout",
    href: "/admin/logout",
  },
];

const DashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="xl:w-[300px] bg-blue-500 h-full p-4">
      {/* Hamburger Icon for mobile */}
      <div className="flex items-center lg:hidden mb-4">
        <FaBars
          className="text-2xl text-white cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Sidebar Content */}
      <div
        className={`flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-y-0 ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div
              className="flex gap-x-2 w-full hover:bg-blue-600 cursor-pointer items-center py-4 pl-4 text-xl text-white rounded-lg"
            >
              {item.icon}{" "}
              <span className="font-normal">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="lg:hidden mt-auto p-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
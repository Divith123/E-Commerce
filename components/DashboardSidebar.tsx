"use client";

import React, { useState } from "react";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaTable, FaRegUser, FaGear, FaBagShopping, FaBars } from "react-icons/fa6";
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
    // Container for the sidebar with fixed positioning and gradient background
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-orange-500 to-orange-700 h-full p-4
                  transition-transform transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }
                  lg:translate-x-0`}
    >
      {/* Hamburger Icon for mobile view to toggle sidebar */}
      <div className="flex items-center lg:hidden mb-4">
        <FaBars
          className="text-2xl text-white cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2">
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.href}>
            {/* Apply styles directly to the Link component */}
            <div className="flex items-center p-3 text-white rounded-lg transition-colors 
                      hover:bg-orange-600 transform hover:scale-105 cursor-pointer">
              {/* Icon for the sidebar item */}
              <span className="text-xl">{item.icon}</span>
              {/* Label for the sidebar item */}
              <span className="ml-3 font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
  
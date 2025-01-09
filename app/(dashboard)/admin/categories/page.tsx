"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { DashboardSidebar, CustomButton } from "@/components";
import { formatCategoryName } from "../../../../utils/categoryFormating";

interface Category {
  id: string;
  name: string;
}

const DashboardCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // Filter categories by search term (case-insensitive)
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col xl:flex-row max-w-screen-2xl mx-auto min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          All Categories
        </h1>

        {/* Search and Actions Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/admin/categories/new">
            <CustomButton
              buttonType="button"
              customWidth="auto"
              paddingX={6}
              paddingY={3}
              textSize="base"
              text="Add New Category"
            />
          </Link>
        </div>

        {/* Table Container */}
        <div className="overflow-auto rounded shadow-sm bg-white">
          <table className="table w-full text-sm text-left">
            {/* Table Head */}
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="p-3">
                  <input type="checkbox" className="checkbox" />
                </th>
                <th className="p-3">Name</th>
                <th className="p-3" />
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr
                    key={nanoid()}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="p-3">
                      <input type="checkbox" className="checkbox" />
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-gray-800">
                        {formatCategoryName(category.name)}
                      </p>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/categories/${category.id}`}
                        className="btn btn-ghost btn-xs bg-blue-500 hover:bg-blue-600 text-white transition-all"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={3}>
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>

            {/* Table Foot (optional repeated header) */}
            <tfoot className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Name</th>
                <th className="p-3"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategory;
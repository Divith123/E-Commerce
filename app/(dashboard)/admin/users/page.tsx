"use client";
import { CustomButton, DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-orange-500 animate-pulse">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4">
      <DashboardSidebar />
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center mb-5">All Users</h1>
        <div className="flex justify-end mb-5">
          <Link href="/admin/users/new">
            <CustomButton
              buttonType="button"
              customWidth="110px"
              paddingX={10}
              paddingY={5}
              textSize="base"
              text="Add New User"
              className="bg-blue-500 hover:bg-blue-700 text-white"
            />
          </Link>
        </div>

        <div className="xl:ml-5 w-full max-xl:mt-5 overflow-auto w-full h-[80vh]">
          <table className="table table-md table-pin-cols w-full">
            {/* Head */}
            <thead className="bg-gray-100">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={nanoid()} className="border-b border-gray-200">
                    <td>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <p>{user?.email}</p>
                      </div>
                    </td>
                    <td>
                      <p>{user?.role}</p>
                    </td>
                    <td>
                      <Link
                        href={`/admin/users/${user?.id}`}
                        className="btn btn-ghost btn-xs text-blue-500 hover:text-blue-700"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Foot */}
            <tfoot className="bg-gray-100">
              <tr>
                <th></th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;
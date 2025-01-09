"use client";
import { DashboardSidebar } from "@/components";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isValidEmailAddressFormat } from "@/lib/utils";

interface DashboardUserDetailsProps {
  params: { id: number };
}

const DashboardSingleUserPage = ({
  params: { id },
}: DashboardUserDetailsProps) => {
  const [userInput, setUserInput] = useState({
    email: "",
    newPassword: "",
    role: "",
  });
  const router = useRouter();

  // API request to delete a user
  const deleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        toast.success("User deleted successfully");
        router.push("/admin/users");
      } else {
        throw Error("There was an error while deleting user");
      }
    } catch (error) {
      toast.error("There was an error while deleting user");
    }
  };

  // API request to update a user
  const updateUser = async () => {
    if (
      userInput.email.length > 3 &&
      userInput.role.length > 0 &&
      userInput.newPassword.length > 0
    ) {
      if (!isValidEmailAddressFormat(userInput.email)) {
        toast.error("You entered invalid email address format");
        return;
      }

      if (userInput.newPassword.length > 7) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/users/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: userInput.email,
                password: userInput.newPassword,
                role: userInput.role,
              }),
            }
          );
          if (response.status === 200) {
            toast.success("User successfully updated");
          } else {
            throw Error("Error while updating user");
          }
        } catch (error) {
          toast.error("There was an error while updating user");
        }
      } else {
        toast.error("Password must be longer than 7 characters");
        return;
      }
    } else {
      toast.error("For updating a user you must enter all values");
      return;
    }
  };

  // API request to fetch a single user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${id}`);
        const data = await response.json();
        setUserInput({
          email: data?.email,
          newPassword: "",
          role: data?.role,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">User details</h1>
        <form>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">New password:</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) =>
                setUserInput({ ...userInput, newPassword: e.target.value })
              }
              value={userInput.newPassword}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">User role: </span>
            </label>
            <select
              className="select select-bordered"
              value={userInput.role}
              onChange={(e) =>
                setUserInput({ ...userInput, role: e.target.value })
              }
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
          <div className="flex gap-x-2 max-sm:flex-col">
            <button
              type="button"
              className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
              onClick={updateUser}
            >
              Update user
            </button>
            <button
              type="button"
              className="uppercase bg-red-600 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
              onClick={deleteUser}
            >
              Remove user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardSingleUserPage;
"use client";
import { DashboardSidebar } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DashboardCreateNewUser = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const { email, password, role } = userInput;

    if (!email || !password || !role) {
      toast.error("All fields are required.");
      return false;
    }

    if (!isValidEmailAddressFormat(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  const addNewUser = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      });

      if (response.status === 201) {
        toast.success("User added successfully");
        setUserInput({ email: "", password: "", role: "user" });
      } else {
        throw new Error("Error while creating user");
      }
    } catch (error) {
      toast.error(error.message || "Error while creating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-orange-50 flex justify-start max-w-screen-2xl mx-auto xl:h-full flex-col xl:flex-row gap-5">
      {/* Sidebar Component */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex flex-col gap-y-7 xl:pl-5 px-5 w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-orange-600">Add New User</h1>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="form-control w-full max-w-xs">
            <span className="label-text text-orange-500">Email:</span>
            <input
              type="email"
              id="email"
              aria-label="Email"
              className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              placeholder="Enter user email"
            />
          </label>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="form-control w-full max-w-xs">
            <span className="label-text text-orange-500">Password:</span>
            <input
              type="password"
              id="password"
              aria-label="Password"
              className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
              placeholder="Enter password"
            />
          </label>
        </div>

        {/* User Role Selection */}
        <div>
          <label htmlFor="role" className="form-control w-full max-w-xs">
            <span className="label-text text-orange-500">User Role:</span>
            <select
              id="role"
              aria-label="User Role"
              className="select select-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={userInput.role}
              onChange={(e) =>
                setUserInput({ ...userInput, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-x-2">
          <button
            type="button"
            className={`uppercase ${
              loading ? "bg-orange-400" : "bg-orange-500"
            } hover:bg-orange-600 text-white font-bold py-3 px-6 rounded shadow transition duration-300`}
            onClick={addNewUser}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateNewUser;

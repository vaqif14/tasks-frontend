import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { toast } from "react-toastify";
import { useSessionToken } from "../hooks/useSessionToken";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { mutateAsync } = useSessionToken();

  const handleGetSessionToken = async () => {
    try {
      await mutateAsync();
      toast.success("Session token retrieved successfully");
    } catch (error) {
      console.error("Error getting session token:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <div className="flex space-x-4">
        <Link to="/" className="text-black dark:text-white">
          Home
        </Link>
        <Link to="/tasks" className="text-black dark:text-white">
          Tasks
        </Link>
        <Link to="/create-task" className="text-black dark:text-white">
          Create Task
        </Link>
      </div>
      <div className="flex gap-5">
        <button className="bg-primary text-white px-4 py-2 rounded dark:bg-blue-700" onClick={handleGetSessionToken}>
          Get Session Token
        </button>
        <button onClick={toggleTheme} className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-700">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
};

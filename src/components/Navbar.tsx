import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "clsx";
import { toast } from "react-toastify";

import { useTheme } from "../hooks/useTheme";
import { useSessionToken } from "../hooks/useSessionToken";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { mutateAsync } = useSessionToken();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetSessionToken = async () => {
    try {
      await mutateAsync();
      toast.success("Session token retrieved successfully");
    } catch (error) {
      console.error("Error getting session token:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <div className="flex justify-between w-full md:w-auto">
        <div className="flex space-x-4">
          <Link to="/tasks" className="text-black dark:text-white hover:underline">
            Tasks
          </Link>
          <Link to="/create-task" className="text-black dark:text-white hover:underline">
            Create Task
          </Link>
        </div>
        <button className="md:hidden text-black dark:text-white" onClick={toggleMenu}>
          Mobile Menu
        </button>
      </div>
      <div
        className={cn("md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0", {
          ["flex"]: isMenuOpen,
          ["hidden"]: !isMenuOpen,
        })}
      >
        <button className="bg-primary text-white px-4 py-2 rounded dark:bg-blue-700 hover:bg-primary-light" onClick={handleGetSessionToken}>
          Get Session Token
        </button>
        <button onClick={toggleTheme} className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-700 hover:bg-blue-600">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
};

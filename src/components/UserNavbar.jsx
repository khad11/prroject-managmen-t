import { Link, NavLink } from "react-router-dom";
import "../UserSidebar.css";
import Avatar from "./Avatar";

import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

// icons
import { IoAddCircleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";
import { useCollection } from "../hooks/useCollection";
import Button from "./Button";

function UserNavbar() {
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { documents } = useCollection("users");
  return (
    <div
      className="bg-base-300 min-h-screen py-10 rounded-tr-2xl rounded-br-2xl text-base-content
 flex flex-col shadow-lg"
    >
      <div className="w-[300px] mx-auto">
        {/* User Profile */}
        <div className="flex flex-col items-center mb-8">
          <Avatar user={user} />
          <h2 className="mt-4 text-xl font-semibold">{user?.displayName}</h2>
          <p className="text-sm opacity-80">Welcome back!</p>
        </div>
        <hr className="border-slate-500 mb-8" />

        {/* Navigation Links */}
        <ul className="flex flex-col gap-6">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-lg transition-all duration-500 ${
                  isActive
                    ? " bg-accent text-white shadow-lg"
                    : "hover:bg-purple-300"
                }`
              }
            >
              <FaProjectDiagram className="text-2xl" /> Projects
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-lg transition-all duration-500 ${
                  isActive
                    ? " bg-accent text-white shadow-lg"
                    : "hover:bg-purple-300"
                }`
              }
            >
              <IoAddCircleOutline className="text-2xl" /> Create
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/settings`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-lg transition-all duration-500 ${
                  isActive
                    ? " bg-accent text-white shadow-lg"
                    : "hover:bg-purple-300"
                }`
              }
            >
              <IoSettingsOutline className="text-2xl" /> Settings
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-auto mx-auto w-full px-6">
        <Button
          className="w-full py-3 mt-8 bg-accent text-white rounded-lg font-semibold text-lg shadow-md hover:bg-purple-700 focus:outline-none transition-all duration-300"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default UserNavbar;

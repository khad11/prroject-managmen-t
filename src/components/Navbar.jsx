import { useThemeToggle } from "../hooks/useThemeToggle";
import { BsMoonStars } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
function Navbar() {
  const { changeTheme, theme } = useThemeToggle();
  return (
    <div>
      <div className="navbar bg-base-200 rounded-xl mb-5 border  shadow-lg">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
            KHADI
          </Link>
        </div>

        <div className="navbar-end flex items-center ">
          <label className="flex cursor-pointer gap-2 justify-end">
            <FiSun className="w-4 h-4" />
            <input
              onChange={changeTheme}
              checked={theme === "black"}
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller toggle-xs"
            />
            <BsMoonStars className="w-4 h-4" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

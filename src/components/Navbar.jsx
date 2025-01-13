import { useThemeToggle } from "../hooks/useThemeToggle";
import { BsMoonStars } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
function Navbar() {
  const { changeTheme } = useThemeToggle();
  return (
    <div>
      <div className="navbar bg-base-100 rounded-xl mb-5">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">KH</a>
        </div>

        <div className="navbar-end flex items-center">
          <label className="flex cursor-pointer gap-2 justify-end">
            <FiSun className="w-4 h-4" />
            <input
              onChange={changeTheme}
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

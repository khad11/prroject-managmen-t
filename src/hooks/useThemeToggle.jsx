import { useEffect, useState } from "react";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "nord";
};

export function useThemeToggle() {
  const [theme, setTheme] = useState(themeFromLocalStorage());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme((prev) => (prev === "nord" ? "black" : "nord"));
  };

  return { changeTheme, theme };
}

import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { MoonIcon } from "@heroicons/react/20/solid";

const ThemeIcon = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-lg border-1 border-neutral-400 p-2 absolute top-6 right-8 xl:right-32 shadow-lg transition duration-300 hover:scale-125 ${
        darkMode ? "shadow-gray-800" : null
      }`}
      id="test"
    >
      <MoonIcon
        className={`h-6 w-6 cursor-pointer stroke-1 ${
          darkMode
            ? "fill-yellow-400 stroke-yellow-400"
            : "fill-none stroke-neutral-400"
        }`}
      />
    </button>
  );
};

export default ThemeIcon;
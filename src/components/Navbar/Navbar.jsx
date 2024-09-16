import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon } from "../../assets/icons";

const Navbar = () => {
  const isDevicePreferDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const userThemePreference = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(
    userThemePreference ? userThemePreference === "dark" : isDevicePreferDark
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      document.documentElement.style.colorScheme = prev ? "light" : "dark";
      localStorage.setItem("theme", prev ? "light" : "dark");
      return !prev;
    });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  // init theme
  useEffect(() => {
    if (
      userThemePreference &&
      (userThemePreference === "dark") !== isDevicePreferDark
    )
      document.documentElement.style.colorScheme = userThemePreference;

    return () => {
      if (
        userThemePreference &&
        (userThemePreference === "dark") === isDevicePreferDark
      )
        localStorage.removeItem("theme");
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="/pi-100" onClick={handleLogoClick} tabIndex={-1}>
          <h1>Pi 100</h1>
        </a>
        <button className="icon-button" onClick={toggleTheme}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
      </nav>
    </>
  );
};

export { Navbar };

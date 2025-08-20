import React from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import DarkMode from "./DarkMode";

const NavLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "News", link: "/news" },
  { id: 3, name: "Country", link: "/country" },
  { id: 4, name: "Compare", link: "/compare" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-white dark:bg-gray-900/90 backdrop-blur shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-12 md:h-14" />
            <h1 className="text-2xl md:text-3xl font-medium text-black dark:text-white dark:font-bold">GloboWise</h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NavLinks.map(({ id, name, link }) => (
                <li key={id}>
                  <Link
                    to={link}
                    className="text-lg font-medium hover:text-primary dark:hover:text-secondary transition-colors border-b-2 border-transparent hover:border-secondary pb-1"
                  >
                    {name}
                  </Link>
                </li>
              ))}

              <DarkMode />
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <DarkMode />
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer" size={30} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer" size={30} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-2/3 sm:w-1/2 bg-white dark:bg-gray-800 shadow-lg transition-transform transform ${showMenu ? "translate-x-0" : "translate-x-full"
          } duration-300 ease-in-out z-[9998]`}
      >
        <div className="p-6 flex flex-col gap-6">
          {NavLinks.map(({ id, name, link }) => (
            <Link
              key={id}
              to={link}
              onClick={toggleMenu}
              className="text-lg font-semibold text-gray-800 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors"
            >
              {name}
            </Link>
          ))}

        </div>
      </div>
    </header>
  );
};

export default Navbar;

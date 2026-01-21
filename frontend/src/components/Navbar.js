import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ onAddClick }) {
  const baseLink =
    "relative text-white transition font-medium";

  const activeLink =
    "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-yellow-300";

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-violet-600 px-8 py-4 flex justify-between items-center shadow-md">
      {/* LOGO / TITLE */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-white text-xl font-bold"
      >
        Employee Dashboard
      </motion.h1>

      {/* NAV LINKS */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex gap-6 items-center"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseLink} hover:text-yellow-300 ${
              isActive ? activeLink : ""
            }`
          }
        >
          All Employees
        </NavLink>

        <NavLink
          to="/department/hr"
          className={({ isActive }) =>
            `${baseLink} hover:text-yellow-300 ${
              isActive ? activeLink : ""
            }`
          }
        >
          HR
        </NavLink>

        <NavLink
          to="/department/engineering"
          className={({ isActive }) =>
            `${baseLink} hover:text-yellow-300 ${
              isActive ? activeLink : ""
            }`
          }
        >
          Engineering
        </NavLink>

        <NavLink
          to="/department/sales"
          className={({ isActive }) =>
            `${baseLink} hover:text-yellow-300 ${
              isActive ? activeLink : ""
            }`
          }
        >
          Sales
        </NavLink>

        <NavLink
          to="/department/finance"
          className={({ isActive }) =>
            `${baseLink} hover:text-yellow-300 ${
              isActive ? activeLink : ""
            }`
          }
        >
          Finance
        </NavLink>

        {/* ADD EMPLOYEE BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition"
        >
          + Add Employee
        </motion.button>
      </motion.div>
    </nav>
  );
}

export default Navbar;

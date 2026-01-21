import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import EmployeeTable from "./components/EmployeeTable";
import DepartmentPage from "./pages/DepartmentPage";
import EmployeeModal from "./components/EmployeeModal";
import HeroSection from "./components/HeroSection";
import { AnimatePresence, motion } from "framer-motion";

// 🔹 Animated routes wrapper
function AnimatedRoutes({ refreshKey }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <EmployeeTable key={refreshKey} />
            </motion.div>
          }
        />

        <Route
          path="/department/:dept"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <DepartmentPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshEmployees = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <BrowserRouter>
      <Navbar onAddClick={() => setOpen(true)} />

      {/* HERO SECTION */}
      <div className="px-6 pt-6">
        <HeroSection onAddClick={() => setOpen(true)} />
      </div>

      {/* ADD / EDIT MODAL */}
      <EmployeeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        refresh={refreshEmployees}
      />

      {/* PAGE CONTENT */}
      <div className="p-6">
        <AnimatedRoutes refreshKey={refreshKey} />
      </div>
    </BrowserRouter>
  );
}

export default App;

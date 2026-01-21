import { motion } from "framer-motion";

function HeroSection({ onAddClick }) {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-2xl p-10 mb-8 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Employee Management System
          </h1>
          <p className="text-purple-100 max-w-xl">
            Manage employees efficiently across departments.  
            Add, edit, filter, export reports, and keep everything organized
            with a clean and animated dashboard.
          </p>
        </div>

        {/* RIGHT ACTION */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold shadow hover:bg-yellow-300 transition"
        >
          + Add New Employee
        </motion.button>
      </motion.div>
    </section>
  );
}

export default HeroSection;

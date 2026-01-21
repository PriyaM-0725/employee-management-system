import { motion } from "framer-motion";
import teamImage from "../assets/team-illustration.png";

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-2xl p-8 md:p-12 mb-8 shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Employee Management System
          </h1>
          <p className="text-purple-100 leading-relaxed max-w-lg">
            A modern dashboard to manage employees across departments.
            Perform CRUD operations, filtering, exports, and role-based organization
            with smooth UI interactions.
          </p>
        </motion.div>

        {/* RIGHT IMAGE WITH ANIMATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          className="relative"
        >
          <motion.img
            src={teamImage}
            alt="Team illustration"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}

export default HeroSection;

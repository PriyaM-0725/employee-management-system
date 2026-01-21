import { useParams } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import { motion } from "framer-motion";

function DepartmentPage() {
  const { dept } = useParams();

  // Capitalize department name for display
  const displayDept =
    dept.charAt(0).toUpperCase() + dept.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <EmployeeTable department={dept} />
    </motion.div>
  );
}

export default DepartmentPage;

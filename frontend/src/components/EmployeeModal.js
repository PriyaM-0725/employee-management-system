import { useEffect, useState } from "react";
import { addEmployee, updateEmployee } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function EmployeeModal({ isOpen, onClose, refresh, editData }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "hr",
    position: "",
    salary: ""
  });

  // Prefill form when editing
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name,
        email: editData.email,
        department: editData.department,
        position: editData.position,
        salary: editData.salary
      });
    }
  }, [editData]);

  const submitHandler = async () => {
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    const payload = {
      ...form,
      department: form.department.toLowerCase()
    };

    try {
      if (editData) {
        await updateEmployee(editData._id, payload);
      } else {
        await addEmployee(payload);
      }

      refresh();
      onClose();
      setForm({
        name: "",
        email: "",
        department: "hr",
        position: "",
        salary: ""
      });
    } catch (err) {
      alert("Operation failed");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
              initial={{ scale: 0.85, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 50 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <h2 className="text-xl font-bold mb-4 text-purple-700">
                {editData ? "Edit Employee" : "Add Employee"}
              </h2>

              <div className="space-y-3">
                <input
                  placeholder="Name"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  placeholder="Email"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <select
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                >
                  <option value="hr">HR</option>
                  <option value="engineering">Engineering</option>
                  <option value="sales">Sales</option>
                  <option value="finance">Finance</option>
                </select>

                <input
                  placeholder="Position"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Salary"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={form.salary}
                  onChange={(e) =>
                    setForm({ ...form, salary: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={submitHandler}
                  className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  {editData ? "Update" : "Add"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EmployeeModal;

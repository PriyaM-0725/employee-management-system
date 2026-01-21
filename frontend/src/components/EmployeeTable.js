import { useEffect, useState, useCallback, useMemo } from "react";
import { getEmployees, deleteEmployee } from "../services/api";
import EmployeeModal from "./EmployeeModal";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function EmployeeTable({ department }) {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  // 🔍 Search
  const [search, setSearch] = useState("");

  // ↕️ Sorting
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState("asc");

  // 🔹 Fetch employees (all / department)
  const fetchEmployees = useCallback(async () => {
    try {
      if (department) {
        const res = await fetch(
          `http://localhost:5000/api/employees/department/${department}`
        );
        const data = await res.json();
        setEmployees(data);
      } else {
        const res = await getEmployees();
        setEmployees(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  }, [department]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // 🔍 Filter + Sort (derived state)
  const filteredEmployees = useMemo(() => {
    let data = employees.filter((emp) =>
      `${emp.name} ${emp.email} ${emp.department}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (sortKey) {
      data.sort((a, b) => {
        if (sortDir === "asc") return a[sortKey] > b[sortKey] ? 1 : -1;
        return a[sortKey] < b[sortKey] ? 1 : -1;
      });
    }

    return data;
  }, [employees, search, sortKey, sortDir]);

  const toggleSort = (key) => {
    setSortDir(sortKey === key && sortDir === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  // 🔹 Excel export (filtered data)
  const exportToExcel = () => {
    if (filteredEmployees.length === 0) {
      alert("No data to export");
      return;
    }

    const worksheetData = filteredEmployees.map((emp) => ({
      Name: emp.name,
      Email: emp.email,
      Department: emp.department,
      Position: emp.position,
      Salary: emp.salary
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    saveAs(
      new Blob([excelBuffer]),
      `${department || "All_Employees"}_Report.xlsx`
    );
  };

  // 🔹 Selection logic
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filteredEmployees.length) {
      setSelected([]);
    } else {
      setSelected(filteredEmployees.map((e) => e._id));
    }
  };

  // 🔹 Delete selected
  const deleteSelected = async () => {
    if (selected.length === 0) {
      alert("No employees selected");
      return;
    }

    if (!window.confirm("Delete selected employees?")) return;

    await Promise.all(selected.map((id) => deleteEmployee(id)));
    setSelected([]);
    fetchEmployees();
  };

  // 🔹 Delete single
  const deleteOne = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold dark:text-white">
          {department
            ? `${department.charAt(0).toUpperCase() + department.slice(1)} Department`
            : "All Employees"}
        </h2>

        <div className="flex gap-2">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            ⬇ Export
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={deleteSelected}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </motion.button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={
                    filteredEmployees.length > 0 &&
                    selected.length === filteredEmployees.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th onClick={() => toggleSort("name")} className="cursor-pointer px-4 py-3">Name ↕</th>
              <th onClick={() => toggleSort("email")} className="cursor-pointer px-4 py-3">Email ↕</th>
              <th onClick={() => toggleSort("department")} className="cursor-pointer px-4 py-3">Dept ↕</th>
              <th className="px-4 py-3">Position</th>
              <th onClick={() => toggleSort("salary")} className="cursor-pointer px-4 py-3">Salary ↕</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredEmployees.length === 0 ? (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No employees found
                  </td>
                </motion.tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <motion.tr
                    key={emp._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`border-b hover:bg-purple-50 ${
  selected.includes(emp._id) ? "bg-purple-100" : ""
}`}

                  >
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(emp._id)}
                        onChange={() => toggleSelect(emp._id)}
                      />
                    </td>
                    <td className="px-4 py-2 text-gray-800">{emp.name}</td>
                    <td className="px-4 py-2 text-gray-800">{emp.email}</td>
                    <td className="px-4 py-2 text-gray-800">{emp.department}</td>
                    <td className="px-4 py-2 text-gray-800">{emp.position}</td>
                    <td className="px-4 py-2 text-gray-800">{emp.salary}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => setEditEmployee(emp)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteOne(emp._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <EmployeeModal
        isOpen={!!editEmployee}
        editData={editEmployee}
        onClose={() => setEditEmployee(null)}
        refresh={fetchEmployees}
      />
    </div>
  );
}

export default EmployeeTable;

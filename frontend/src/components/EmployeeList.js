function EmployeeList({ employees, remove }) {
  return (
    <ul>
      {employees.map(emp => (
        <li key={emp._id}>
          {emp.name} - {emp.position}
          <button onClick={() => remove(emp._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;

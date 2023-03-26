SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id JOIN department ON role.department_id=department.id;
SELECT * FROM employee;
-- SELECT * FROM department;
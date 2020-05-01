USE employee_tracker_DB;

-- INSERT INTO department (name)
-- VALUES ("engineering");

-- INSERT INTO role (title, salary, department_id)
-- VALUES ("engineer", "110000", 4);

-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("Brenda", "Edwards", 4);

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;


-- view employees
SELECT employee.id, employee.first_name `first name`, employee.last_name `last name`, role.title, role.salary, department.name department, CONCAT(manager.first_name, " ", manager.last_name) manager
FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

-- view roles
SELECT role.title, role.salary, department.name department
FROM role
LEFT JOIN department ON role.department_id = department.id;

-- view departments
SELECT department.id, department.name department
FROM department;

-- view employees by role
SELECT role.title, employee.id `emp id`, employee.first_name `first name`, employee.last_name `last name`, role.salary, department.name department, CONCAT(manager.first_name, " ", manager.last_name) manager
FROM role
LEFT JOIN employee ON role.id = employee.role_id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

-- view employees by department
SELECT department.id `dept id`, department.name department, employee.id `emp id`, employee.first_name `first name`, employee.last_name `last name`
FROM department
LEFT JOIN role ON department.id = role.department_id
LEFT JOIN employee ON role.id = employee.role_id;

-- view employee by manager
SELECT manager.id `mgr id`, CONCAT(manager.first_name, " ", manager.last_name) manager, employee.id `emp id`, employee.first_name `first name`, employee.last_name `last name`
FROM employee
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id
ORDER BY manager.id ASC;



-- search employee by manager
SELECT employee.id, employee.first_name `first name`, manager_id
FROM employee
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id
WHERE manager_id = 2;
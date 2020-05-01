USE employee_tracker_DB;

INSERT INTO department (name)
VALUES ("engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("engineer", "110000", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Brenda", "Edwards", 4);


-- USE employee_tracker_DB;

-- INSERT INTO department (name)
-- VALUES ("engineering");

-- SELECT @last := LAST_INSERT_ID();

-- INSERT INTO role (title, salary, department_id)
-- VALUES ("engineer", "110000", @last);

-- SELECT @last := LAST_INSERT_ID();

-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("Brenda", "Edwards", @last);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT employee.id, employee.first_name `first name`, employee.last_name `last name`, role.title, role.salary, department.name department, CONCAT(manager.first_name, " ", manager.last_name) manager
FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

SELECT employee.id, employee.first_name `first name`, manager_id
FROM employee
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id
WHERE manager_id = 2;
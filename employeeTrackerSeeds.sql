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
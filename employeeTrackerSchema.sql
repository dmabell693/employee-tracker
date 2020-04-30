DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL REFERENCES role(id),
    manager_id INT NULL REFERENCES employee(id),
    PRIMARY KEY (id)
);
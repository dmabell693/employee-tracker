const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./connection");

viewOptions = () => {
    inquirer
        .prompt({
            name: "whichView",
            type: "rawlist",
            choices:
                [
                    "View all employees",
                    "View all roles",
                    "View all departments",
                    "View all employees by role",
                    "View all employees by department",
                    "View all employees by manager"
                ],
            message: "What would you like to view?"
        })
        .then(function (answer) {
            switch (answer.whichView) {
                case "View all employees":
                    viewEmployees();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "View all departments":
                    viewDepartments();
                    break;

                case "View all employees by role":
                    viewEmpByRole();
                    break;

                case "View all employees by department":
                    viewEmpByDept();
                    break;

                case "View all employees by manager":
                    viewEmpByManager();
                    break;
            }
        });
}

viewEmployees = () => {
    connection.query("SELECT employee.id, employee.first_name `first name`, employee.last_name `last name`, role.title, department.name department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
}

viewRoles = () => {
    connection.query("SELECT role.title, role.salary, department.name department FROM role LEFT JOIN department ON role.department_id = department.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
}

viewDepartments = () => {
    connection.query("SELECT department.id, department.name department FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
}

viewEmpByRole = () => {
    connection.query("SELECT role.title, employee.id `emp id`, employee.first_name `first name`, employee.last_name `last name`, role.salary, department.name department, CONCAT(manager.first_name, ' ', manager.last_name) manager FROM role LEFT JOIN employee ON role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
}

viewEmpByDept = () => {
    connection.query("SELECT department.id `dept id`, department.name department, employee.id `emp id`, employee.first_name `first name`, employee.last_name `last name` FROM department LEFT JOIN role ON department.id = role.department_id LEFT JOIN employee ON role.id = employee.role_id;",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
}

viewEmpByManager = () => {
    connection.query("SELECT manager.id `mgr id`, CONCAT(manager.first_name, ' ', manager.last_name) manager, employee.id `emp id`, employee.first_name `first name`, employee.last_name `last name` FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY manager.id ASC",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
}

module.exports = viewOptions;
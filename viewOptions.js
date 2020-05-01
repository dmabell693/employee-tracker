const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./connection");


// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "",
//     database: "employee_tracker_DB"
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     start();
// });

viewOptions = () => {
    inquirer
        .prompt({
            name: "whichView",
            type: "rawlist",
            choices:
                [
                    "View all employees",
                    "View all roles",
                    "View all departments"
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
            }
        });
}

viewEmployees = () => {
    connection.query("SELECT employee.id, employee.first_name `first name`, employee.last_name `last name`, role.title, department.name department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

module.exports = viewOptions;
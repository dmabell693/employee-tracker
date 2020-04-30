const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

start = () => {
    inquirer
        .prompt({
            name: "startOptions",
            type: "rawlist",
            choices: [
                "Add",
                "View",
                "Update"
            ],
            message: "What would you like to do?"
        })
        .then(function (answer) {
            switch (answer.startOptions) {
                case "Add":
                    addOptions();
                    break;

                case "View":
                    viewOptions();
                    break;

                case "Update":
                    updateOptions();
                    break;
            }
        });
}

addOptions = () => {
    inquirer
        .prompt({
            name: "addOptions",
            type: "rawlist",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee"
            ],
            message: "What would you like to do?"
        })
        .then(function (answer) {
            switch (answer.addOptions) {
                case "Add a department":
                    addDepartment();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Add an employee":
                    addEmployee();
                    break;
            }
        })
}

addDepartment = () => {
    inquirer
        .prompt({
            name: "deptName",
            type: "input",
            message: "What is the name of the department you would like to add?"
        })
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                { name: answer.deptName },
                function (err) {
                    if (err) throw err;
                    console.log(`You successfully added ${answer.deptName} to Departments.`);
                    start();
                });
        });
}

addRole = () => {
    connection.query("SELECT * FROM department", function (err, departments) {
        if (err) throw err;
        let department = departments.map(department => department.name);

        inquirer
            .prompt({
                name: "departments",
                type: "rawlist",
                choices: department,
                message: "In which department would you like to add a role?"
            })
            .then(function (answer) {

                connection.query("SELECT id FROM department WHERE ?", { name: answer.departments }, function (err, res) {
                    if (err) throw err;

                    let departmentID = res[0].id;
                    console.log(departmentID);

                    inquirer
                        .prompt([
                            {
                                name: "title",
                                type: "input",
                                message: "What is the new role's title?"
                            },
                            {
                                name: "salary",
                                type: "input",
                                message: "What is the new role's salary?"
                            }
                        ])
                        .then(function (answer) {
                            connection.query("INSERT INTO role SET ?",
                                {
                                    title: answer.title,
                                    salary: answer.salary,
                                    department_id: departmentID
                                },
                                function (err) {
                                    if (err) throw err;
                                    console.log(`You successfully added ${answer.title} to Roles.`);
                                    start();
                                });
                        });
                });
            });
    })
}






// addDepartment = () => {
//     const query = connection.query("INSERT INTO department SET ?",
//         {
//             name: "accounting"
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.table(res);
//         });
//     console.log(query.sql);
//     addRole();
// };

// addRole = () => {
//     const query = connection.query("INSERT INTO role SET ?",
//         {
//             title: "accountant",
//             salary: 85000,
//             department_id: 2
//         });
//     console.log(query.sql);
//     addEmployee();
// };

// addEmployee = () => {
//     const query = connection.query("INSERT INTO employee SET ?",
//         {
//             first_name: "Angela",
//             last_name: "Martin",
//             role_id: 2
//         });
//     console.log(query.sql);
// };

// deleteRole = () => {
//     const query = "DELETE FROM department WHERE ?";
//     connection.query(query, { name: "accounting" }, function (err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows);
//     });
//     console.log(query.sql);
// }
// // deleteRole();

// updateRole = () => {
//     const query = connection.query("UPDATE role SET ? WHERE ?",
//         [
//             { title: "hr rep" },
//             { department_id: "4" }
//         ],
//         function (err, res) {
//             if (err) throw err;
//         });
//     console.log(query.sql);
// }

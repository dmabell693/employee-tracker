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
    });
}

addEmployee = () => {
    connection.query("SELECT * FROM role", function (err, roles) {
        if (err) throw err;
        let role = roles.map(role => role.title);

        connection.query("SELECT * FROM employee", function (err, employees) {
            if (err) throw err;
            let manager = employees.map(employee => employee.first_name + " " + employee.last_name);
            manager.push("none");

            inquirer
                .prompt([
                    {
                        name: "roles",
                        type: "rawlist",
                        choices: role,
                        message: "What will be the role of your employee?"
                    },
                    {
                        name: "managerName",
                        type: "rawlist",
                        choices: manager,
                        message: "Who will be the employee's manager?"
                    }
                ])
                .then(function (answer) {

                    connection.query("SELECT id FROM role WHERE ?", { title: answer.roles }, function (err, res) {
                        if (err) throw err;

                        let roleID = res[0].id;
                        console.log(roleID);
                        console.log(res);
                        console.log(answer.managerName);
                        let manName = answer.managerName.split(" ");
                        console.log(manName);
                        console.log(manName[0]);
                        console.log(manName[1]);

                        // console.log(answer);

                        connection.query("SELECT id FROM employee WHERE ?",
                            [
                                {
                                    first_name: manName[0]
                                },
                                {
                                    last_name: manName[1]
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                console.log(res);

                                let managerID = res[0].id;
                                console.log(managerID);

                                inquirer
                                    .prompt([
                                        {
                                            name: "firstName",
                                            type: "input",
                                            message: "What is the employee's first name?"
                                        },
                                        {
                                            name: "lastName",
                                            type: "input",
                                            message: "What is the employee's last name?"
                                        }
                                    ])
                                    .then(function (answer) {
                                        connection.query("INSERT INTO employee SET ?",
                                            {
                                                first_name: answer.firstName,
                                                last_name: answer.lastName,
                                                role_id: roleID,
                                                manager_id: managerID
                                            },
                                            function (err) {
                                                if (err) throw err;
                                                console.log(`You successfully added ${answer.firstName} ${answer.lastName} to Employees.`);
                                                start();
                                            });
                                    });
                            });
                    });
                });
        });
    });
}



//                                     connection.query("SELECT * FROM employee", function (err, employees) {
//                                         if (err) throw err;
//                                         console.log(employees);
//                                         let manager = employees.map(manager => manager.first_name + " " + manager.last_name);
//                                         manager.push("none");

//                                         inquirer
//                                             .prompt({
//                                                 name: "managerID",
//                                                 type: "rawlist",
//                                                 choices: manager,
//                                                 message: "Who will be your employee's manager?"
//                                             })
//                                             .then(function (answer) {
//                                                 console.log(answer);
//                                                 if (answer.managerID === "none") {
//                                                     console.log(roleID);
//                                                     start();
//                                                 } else {
//                                                     connection.query("UPDATE employees SET ? WHERE ?",
//                                                         [
//                                                             {
//                                                                 manager_id: answer.managerID
//                                                             },
//                                                             {
//                                                                 first_name: answer.firstName,
//                                                                 last_name: answer.lastName
//                                                             }
//                                                         ],
//                                                         function (err) {
//                                                             if (err) throw err;
//                                                             console.log(`You successfully added ${answer.firstName} ${answer.lastName} to Employees.`);
//                                                             start();
//                                                         }
//                                                     )
//                                                 };
//                                             });
//                                     });
//                                 });
//                         });
//                 });
//             });
//     });
// }






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
const inquirer = require("inquirer");
const connection = require("./connection");

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
            message: "What would you like to add?"
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
                        name: "firstName",
                        type: "input",
                        message: "What is the employee's first name?"
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "What is the employee's last name?"
                    },
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

                        if (answer.managerName === "none") {
                            connection.query("INSERT INTO employee SET ?",
                                {
                                    first_name: answer.firstName,
                                    last_name: answer.lastName,
                                    role_id: roleID
                                },
                                function (err) {
                                    if (err) throw err;
                                    console.log(`You successfully added ${answer.firstName} ${answer.lastName} to Employees.`);
                                    start();
                                })
                        } else {
                            let name = answer.managerName.split(" ");
                            connection.query("SELECT id FROM employee WHERE ?",
                                [
                                    {
                                        first_name: name[0]
                                    },
                                    {
                                        last_name: name[1]
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;

                                    let managerID = res[0].id;

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
                                        })
                                });
                        };
                    });
                });
        });
    });
}

module.exports = addOptions;
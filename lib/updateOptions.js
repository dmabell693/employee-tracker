// dependencies
const inquirer = require("inquirer");
const connection = require("./connection");

updateOptions = () => {
    inquirer
        .prompt({
            name: "updateOptions",
            type: "rawlist",
            choices: [
                "Update employee roles",
                "Update employee managers"
            ],
            message: "What would you like to update?"
        })
        .then(function (answer) {
            switch (answer.updateOptions) {
                case "Update employee roles":
                    updateEmpRole();
                    break;

                case "Update employee managers":
                    updateEmpMan();
                    break;
            };
        });
}

updateEmpRole = () => {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if (err) throw err;
        let employee = employees.map(employee => `${employee.first_name} ${employee.last_name}`);

        connection.query("SELECT * FROM role", function (err, roles) {
            if (err) throw err;

            // as with addRole() and addEmployee(), not having a role with which to update the employee will send the user back to the start 
            let role = roles.map(role => role.title);
            role.push("none of these");

            inquirer
                .prompt([
                    {
                        name: "whichEmployee",
                        type: "rawlist",
                        choices: employee,
                        message: "Which employee's role would you like to update?"
                    },
                    {
                        name: "roleUpdate",
                        type: "rawlist",
                        choices: role,
                        message: "What will be the employee's new role?"
                    }
                ])
                .then(function (answer) {
                    if (answer.roleUpdate === "none of these") {
                        console.log("Please add the appropriate role into the database before updating this employee");
                        start();
                    } else {
                        let name = answer.whichEmployee.split(" ");
                        connection.query("SELECT id FROM role WHERE ?", { title: answer.roleUpdate }, function (err, res) {
                            if (err) throw err;
                                console.log(res);

                            connection.query("UPDATE employee SET ? WHERE ?",
                                [
                                    {
                                        role_id: res[0].id
                                    },
                                    {
                                        first_name: name[0]
                                    },
                                    {
                                        last_name: name[1]
                                    }
                                ],
                                function (err) {
                                    if (err) throw err;
                                    console.log(`${name.join(" ")} succesfully updated.`);
                                    start();
                                }
                            );
                        });
                    }
                });
        });
    });
}

updateEmpMan = () => {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if (err) throw err;
        let employee = employees.map(employee => `${employee.first_name} ${employee.last_name}`);

        inquirer
            .prompt([
                {
                    name: "whichEmployee",
                    type: "rawlist",
                    choices: employee,
                    message: "Which employee's manager would you like to update?"
                },
                {
                    name: "whichManager",
                    type: "rawlist",
                    choices: employee,
                    message: "Who will be this employee's new manager?"
                }
            ])
            .then(function (answer) {
                let empName = answer.whichEmployee.split(" ");
                let manName = answer.whichManager.split(" ");
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
                        connection.query("UPDATE employee SET ? WHERE ?",
                        [
                            {
                                manager_id: res[0].id
                            },
                            {
                                first_name: empName[0]
                            },
                            {
                                last_name: empName[1]
                            }
                        ],
                        function(err) {
                            if (err) throw err;
                            console.log(`${empName.join(" ")} succesfully updated.`);
                            start();
                        });
                    });

            });
    });
}

module.exports = updateOptions;
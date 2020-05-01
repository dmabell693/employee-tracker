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
            }
        })
}

updateEmpRole = () => {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if (err) throw err;
        let employee = employees.map(employee => `${employee.first_name} ${employee.last_name}`);

        connection.query("SELECT * FROM role", function (err, roles) {
            if (err) throw err;
            let role = roles.map(role => role.title);
            role.push("none of these");
            let roleID = roles.map(role => role.id);

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
                        console.log("Please add the new role into the database before updating this employee");
                        start();
                    } else {
                        let name = answer.whichEmployee.split(" ");
                        connection.query("SELECT id FROM role WHERE ?", { title: answer.roleUpdate }, function (err, res) {
                            if (err) throw err;

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

// "UPDATE auctions SET ? WHERE ?",
//     [
//         {
//             highest_bid: answer.bid
//         },
//         {
//             id: chosenItem.id
//         }
//     ],



module.exports = updateOptions;
const inquirer = require("inquirer");
const connection = require("./connection");

deleteOptions = () => {
    inquirer
        .prompt({
            name: "deleteOptions",
            type: "rawlist",
            choices: [
                "Delete a department",
                "Delete a role",
                "Delete an employee"
            ],
            message: "What would you like to delete?"
        })
        .then(function (answer) {
            switch (answer.deleteOptions) {
                case "Delete a department":
                    deleteDepartment();
                    break;
                case "Delete a role":
                    deleteRole();
                    break;
                case "Delete an employee":
                    deleteEmployee();
                    break;
            };
        });
}

deleteDepartment = () => {
    connection.query("SELECT * FROM department", function(err, departments) {
        if (err) throw err;
        let department = departments.map(department => department.name);
        department.push("I've changed my mind. This department lives to see another day!")

        inquirer
        .prompt({
            name: "whichDepartment",
            type: "rawlist",
            choices: department,
            message: "Which department would you like to delete?"
        })
        .then(function(answer) {
            if (answer.whichDepartment === "I've changed my mind. This department lives to see another day!") {
                console.log("Very well");
                start();
            } else {
                connection.query("DELETE FROM department WHERE ?", { name: answer.whichDepartment }, function(err) {
                    if (err) throw err;
                    console.log(`${answer.whichDepartment} successfully deleted.`);
                    start();
                });
            };
        });
    });
}

deleteRole = () => {
    connection.query("SELECT * FROM role", function(err, roles) {
        if (err) throw err;
        let role = roles.map(role => role.title);
        role.push("I've changed my mind. This role lives to see another day!")

        inquirer
        .prompt({
            name: "whichRole",
            type: "rawlist",
            choices: role,
            message: "Which role would you like to delete?"
        })
        .then(function(answer) {
            if (answer.whichRole === "I've changed my mind. This role lives to see another day!") {
                console.log("Very well");
                start();
            } else {
                connection.query("DELETE FROM role WHERE ?", { title: answer.whichRole }, function(err) {
                    if (err) throw err;
                    console.log(`${answer.whichRole} successfully deleted.`);
                    start();
                });
            };
        });
    });
}

deleteEmployee = () => {
    connection.query("SELECT * FROM employee", function(err, employees) {
        if (err) throw err;
        let employee = employees.map(employee => `${employee.first_name} ${employee.last_name}`);
        employee.push("I've changed my mind. This employee lives to see another day!")

        inquirer
        .prompt({
            name: "whichEmployee",
            type: "rawlist",
            choices: employee,
            message: "Which employee would you like to delete?"
        })
        .then(function(answer) {
            if (answer.whichEmployee === "I've changed my mind. This employee lives to see another day!") {
                console.log("Very well");
                start();
            } else {
                let name = answer.whichEmployee.split(" ");
                connection.query("DELETE FROM employee WHERE ?",
                [
                    {
                        first_name: name[0]
                    },
                    {
                        last_name: name[1]
                    }
                ],
                function(err) {
                    if (err) throw err;
                    console.log(`${name.join(" ")} successfully deleted.`);
                    start();
                });
            };
        });
    });
}


module.exports = deleteOptions;
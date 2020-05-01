const inquirer = require("inquirer");
const connection = require("./connection");

calculateBudget = () => {
    connection.query("SELECT * FROM department", function (err, departments) {
        if (err) throw err;
        let department = departments.map(department => department.name);

        inquirer
            .prompt({
                name: "whichDepartment",
                type: "rawlist",
                choices: department,
                message: "Which department's budget would you like to calculate?"
            })
            .then(function (answer) {
                connection.query("SELECT id FROM department WHERE ?", { name: answer.whichDepartment }, function (err, res) {
                    if (err) throw err;

                    connection.query("SELECT SUM(salary) sum FROM role LEFT JOIN employee ON role.id = employee.role_id WHERE ?", { department_id: res[0].id }, function (err, res) {
                        if (err) throw err;
                        console.log(`\n\nThe total budget of this department is $${res[0].sum}.\n\n`);
                        start();
                    });
                });
            });
    });
}

module.exports = calculateBudget;
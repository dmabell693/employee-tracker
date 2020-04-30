const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const options = require("./addOptions")

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
                    options();
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
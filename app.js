// dependencies
const inquirer = require("inquirer");

// all functions have been placed into lib directory to keep this file clean
const addOptions = require("./lib/addOptions");
const viewOptions = require("./lib/viewOptions");
const updateOptions = require("./lib/updateOptions");
const deleteOptions = require("./lib/deleteOptions");
const calculateBudget = require("./lib/calculateBudget");

// triggered upon successful connection to database
start = () => {
    inquirer
        .prompt({
            name: "startOptions",
            type: "rawlist",
            choices: [
                "Add",
                "View",
                "Update",
                "Delete",
                "Calculate Budget"
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
                case "Delete":
                    deleteOptions();
                    break;
                case "Calculate Budget":
                    calculateBudget();
                    break;
            };
        });
}
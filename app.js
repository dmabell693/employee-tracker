const inquirer = require("inquirer");
const addOptions = require("./lib/addOptions");
const viewOptions = require("./lib/viewOptions");
const updateOptions = require("./lib/updateOptions");
const deleteOptions = require("./lib/deleteOptions");
const calculateBudget = require("./lib/calculateBudget");

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
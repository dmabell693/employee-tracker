const inquirer = require("inquirer");
const addOptions = require("./lib/addOptions");
const viewOptions = require("./lib/viewOptions");
const updateOptions = require("./lib/updateOptions");

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
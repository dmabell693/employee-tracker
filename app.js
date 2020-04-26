const mysql = require("mysql");
const inquirer = require("inquirer");

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

start = () => addDepartment();

addDepartment = () => {
    const query = connection.query("INSERT INTO department SET ?",
        {
            name: "accounting"
        },
        function (err, res) {
            if (err) throw err;
            console.table;
        });
    console.log(query.sql);
    addRole();
};

addRole = () => {
    const query = connection.query("INSERT INTO role SET ?",
        {
            title: "accountant",
            salary: 85000,
            department_id: 2
        });
    console.log(query.sql);
    addEmployee();
};

addEmployee = () => {
    const query = connection.query("INSERT INTO employee SET ?",
        {
            first_name: "Angela",
            last_name: "Martin",
            role_id: 2
        });
    console.log(query.sql);
};

// deleteRole = () => {
//     const query = connection.query("DELETE FROM department WHERE ?",
//         {
//             name: "engineering"
//         },
//         function(err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows)
//         });
//     console.log(query.sql);
// }
// deleteRole();
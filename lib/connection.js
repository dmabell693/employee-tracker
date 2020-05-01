const mysql = require("mysql");

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

module.exports = connection;
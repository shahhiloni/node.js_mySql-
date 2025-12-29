const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydatabase"
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed", err);
    return;
  }
  console.log("MySQL Connected Successfully");
});

module.exports = connection;

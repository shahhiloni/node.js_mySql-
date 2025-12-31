const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", 
  user:"root", 
  password:"",
  database: ""
})


connection.connect((err) => {
  if(err){
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("Mysql connected successfully");
  }
})

module.exports = connection
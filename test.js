
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3307",
  password: "",
  database: "tasks"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

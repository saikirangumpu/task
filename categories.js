const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3307",
    password: "",
    database: "tasks"
});

db.connect(function (error) {
    if (error) {
        console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

  server.listen(8085,function check(error) {
    if (error) 
    {  console.log("Error....dddd!!!!");
    } else 
    {
        console.log("Started....!!!! 8085");
    }
});

server.post("/api/categories/add", (req, res) => {
    let details = {
      name: req.body.name,
      type: req.body.type,
    };
    let sql = "INSERT INTO categories SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Categories created Failed" });
      } else {
        res.send({ status: true, message: "Categories created successfully" });
      }
    });
  });


server.get("/api/categories", (req, res) => {
    var sql = "SELECT * FROM categories";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


server.get("/api/categories/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM categories WHERE id=" + studentid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

server.put("/api/categories/update/:id", (req, res) => {
    let sql =
      "UPDATE categories SET name='" +
      req.body.name +
      "', type='" +
      req.body.type +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Category Updated Failed" });
      } else {
        res.send({ status: true, message: "Category Updated successfully" });
      }
    });
  });

  server.delete("/api/categories/delete/:id", (req, res) => {
    let sql = "DELETE FROM categories WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Category Deleted Failed" });
      } else {
        res.send({ status: true, message: "Category Deleted successfully" });
      }
    });
  });
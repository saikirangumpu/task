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
    {
    console.log("Error....dddd!!!!");
    } else 
    {
        console.log("Started....!!!! 8085");

    }
});

 
server.post("/api/transactions/add", (req, res) => {
    let details = {
        type: req.body.type,
        category: req.body.category, // Foreign key reference to categories
        amount: req.body.amount,
        date: req.body.date,
        description: req.body.description
    };
    
    let sql = "INSERT INTO transactions SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Transaction creation failed" });
        } else {
            res.send({ status: true, message: "Transaction created successfully" });
        }
    });
});

 
server.get("/api/transactions", (req, res) => {
    var sql = "SELECT * FROM transactions";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error connecting to DB");
            res.send({ status: false, message: "Error fetching transactions" });
        } else {
            res.send({ status: true, data: result });
        }
    });
});

 
server.get("/api/transactions/:id", (req, res) => {
    var transactionId = req.params.id;
    var sql = "SELECT * FROM transactions WHERE id=" + transactionId;
    db.query(sql, function (error, result) {
        if (error) {
            res.send({ status: false, message: "Error fetching transaction" });
        } else {
            res.send({ status: true, data: result });
        }
    });
});

server.put("/api/transactions/update/:id", (req, res) => {
    let sql = 
        "UPDATE transactions SET type='" + req.body.type + 
        "', category='" + req.body.category +
        "', amount='" + req.body.amount + 
        "', date='" + req.body.date + 
        "', description='" + req.body.description + 
        "' WHERE id=" + req.params.id;
    
    db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Transaction update failed" });
        } else {
            res.send({ status: true, message: "Transaction updated successfully" });
        }
    });
});

 
server.delete("/api/transactions/delete/:id", (req, res) => {
    let sql = "DELETE FROM transactions WHERE id=" + req.params.id;
    db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Transaction deletion failed" });
        } else {
            res.send({ status: true, message: "Transaction deleted successfully" });
        }
    });
});


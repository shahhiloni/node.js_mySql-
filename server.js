// CRUD operation 

const express = require("express");
const connection = require("./connection");

const app = express();
app.use(express.json());

app.get("/", (res) => {
    res.send("mysql connected with node.js");
});

// Insert Data in Database (Create Data)  - POST method 

app.post("/add-student", (req, res) => {
    const {name, email, phone} = req.body;

    const sql = "INSERT INTO students (name, email, phone) VALUES (?, ?, ?)";
    connection.query(sql, [name, email, phone], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("User added successfully");
        }
    })
})

// View Data which is Added in Database or existing data in database
app.get ("/students", (req, res) => {
    connection.query("SELECT * FROM students", (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});

// View data According to ID 
app.get("/students/:id", (req, res) => {
    const {id} = req.params;

    const sql = "SELECT * FROM students WHERE id = ?";

    connection.query(sql, [id], (err, data) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.json(data);
    });
});

// PUT : update the existing data in database

app.put("/students-update/:id", (req, res) => {
    const { id} = req.params;

    const {name, email, phone} = req.body;

    const sql = "UPDATE students SET name= ?, email=?, phone=? WHERE id=?";
    connection.query(sql, [name, email, phone, id], (err, result) => {
        if(err) {
            return res.status(500).json(err);
        } res.json({message : "Students data updated successfully"});
    })
})

// DELETE : delete data using id 
app.delete("/students-delete/:id", (req, res) => {
    const {id} = req.params;

    const sql = "DELETE FROM students WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if(err) {
            return res.status(500).json(err);
        } res.json({message :"data deleted successfully"});
    })
})

// PORT Connection 
app.listen(3000, () => {
    console.log("Server connected on port 3000");
});


// {
//     key : value
// }

// INSERT INTO  or insert into both are different in mysql query

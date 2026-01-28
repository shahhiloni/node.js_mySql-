const bcrypt = require("bcrypt");
const express = require("express");
const connection = require("./connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
const {email, password} = req.body;

if (!email || !password) {
    return res.status(400).json({message: "email and password are required"})
}

connection.query(
    "SELECT * FROM register WHERE email = ?", [email], async(err, result) => {
        if(err){
            return res.status(500).json({message: "database error", error: err});
        }

        if(result.length === 0){
            return res.status(404).json({message: "user not found"});
        }

        const isMatch = await bcrypt.compare(password, result[0].password);
        if (!isMatch) {
            return res.status(401).json({message: "invalid password"});
        }

const token = jwt.sign (
    {
        id: result[0].id,
        email: result[0].email
    }, 
    process.env.JWT_SECRET, 
    {expiresIn: "1h"}
)        
        res.status(200).json({
            message: "user login successfully", 
            token: token,
            register: {
                id: result[0].id,
                name: result[0].name, 
                email: result[0].email
            }
        });
    }
)
})


app.listen(3000, () => {
    console.log("server running on port 3000")
})
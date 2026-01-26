const bcrypt = require("bcrypt");
const express = require("express");
const connection = require("./connection");

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    connection.query(
      "SELECT * FROM register WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err,
          });
        }

        if (result.length > 0) {
          return res
            .status(400)
            .json({ message: "Email address already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query(
          "INSERT INTO register (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          (err) => {
            if (err) {
              return res.status(500).json({
                message: "Error registering user",
                error: err,
              });
            }

            res.status(201).json({
              message: "User registered successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
    console.log("server running on port 3000")
})
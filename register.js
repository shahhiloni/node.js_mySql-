app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    // Check existing user
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            (err) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "User registered successfully" });
            }
        );
    });
});

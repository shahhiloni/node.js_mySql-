const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const tokens = req.header["authorization"];

    if(!tokens) {
        return res.status(403).json({message: "Token required"});
    }

    jwt.verify(tokens, process.env.JWT_SECRET, (err, decoded) => {
if(err) {
    return res.status(401).json({message: "invalid token"});
}

req.register = decoded;
next();
    })
}

module.exports = verifyToken;

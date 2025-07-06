const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Account = require("../models/account");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // remove 'Bearer' part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data to request
    
    const account = await Account.findOne({ userId: decoded.id });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    req.account = account;

    next(); // allow access to route
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;

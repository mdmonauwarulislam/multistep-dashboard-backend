const jwt = require("jsonwebtoken");
const httpsStatusCode = require("../constants/httpsStatusCode");
const dotenv = require("dotenv");
dotenv.config();

async function getToken(user) {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
}

async function verifyToken(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token) {
    return res.status(httpsStatusCode.UNAUTHORIZED).json({
      status: false,
      message: "Unauthorized",
    });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(httpsStatusCode.UNAUTHORIZED).json({
      error: error.message,
      status: false,
      message: "Unauthorized",
    });
  }
}


module.exports = { getToken, verifyToken };

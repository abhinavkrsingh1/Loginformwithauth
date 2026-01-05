const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  // Check session first
  if (req.session && req.session.userId) {
    return next();
  }

  // Fallback to JWT token
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { ensureAuthenticated };

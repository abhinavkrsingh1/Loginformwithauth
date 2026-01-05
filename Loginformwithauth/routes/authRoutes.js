const express = require("express");
const router = express.Router();

const { signup, login, getMe, logout } = require("../controllers/authController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", ensureAuthenticated, getMe);
router.post("/logout", logout);

module.exports = router;

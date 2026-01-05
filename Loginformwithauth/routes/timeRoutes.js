const express = require("express");
const router = express.Router();

const { getIndiaTime, greeting, getWidgets } = require("../controllers/timeController");

// Time routes
router.get("/india-time", getIndiaTime);
router.get("/ankit", greeting);
router.get("/widgets", getWidgets);

module.exports = router;

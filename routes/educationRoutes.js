const express = require("express");
const { addEducationDetails, getEducationDetails } = require("../controllers/educationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addEducationDetails);
router.get("/:userId", protect, getEducationDetails);

module.exports = router;

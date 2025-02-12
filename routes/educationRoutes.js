const express = require("express");
const { addEducationDetails, getEducationDetails, updateEducationDetails } = require("../controllers/educationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addEducationDetails);
router.get("/:userId", protect, getEducationDetails);
router.put("/:userId", protect, updateEducationDetails); 


module.exports = router;

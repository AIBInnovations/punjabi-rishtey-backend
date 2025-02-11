const express = require("express");
const { addFamilyDetails, getFamilyDetails } = require("../controllers/familyController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addFamilyDetails);
router.get("/:userId", protect, getFamilyDetails);

module.exports = router;

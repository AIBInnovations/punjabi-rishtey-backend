const express = require("express");
const { addFamilyDetails, getFamilyDetails,  updateFamilyDetails } = require("../controllers/familyController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addFamilyDetails);
router.get("/:userId", protect, getFamilyDetails);
router.put("/:userId", protect, updateFamilyDetails); 

module.exports = router;

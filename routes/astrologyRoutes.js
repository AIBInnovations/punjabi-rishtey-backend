const express = require("express");
const { addAstrologyDetails, getAstrologyDetails, updateAstrologyDetails } = require("../controllers/astrologyController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addAstrologyDetails);
router.get("/:userId", protect, getAstrologyDetails);
router.put("/:userId", protect, updateAstrologyDetails); 


module.exports = router;

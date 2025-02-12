const express = require("express");
const { addProfessionDetails, getProfessionDetails,updateProfessionDetails} = require("../controllers/professionController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addProfessionDetails);
router.get("/:userId", protect, getProfessionDetails);
router.put("/:userId", protect, updateProfessionDetails); 


module.exports = router;

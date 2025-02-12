const express = require("express");
const { registerUser, loginUser, searchMatches, getUserProfile, updateUserProfile, uploadProfilePicture, uploadMultipleProfilePictures} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", protect, searchMatches);
router.get("/:id", protect, getUserProfile);
router.put("/:id", protect, updateUserProfile); 
router.post("/:id/upload-multiple", protect, upload.array("profile_pictures", 10), uploadMultipleProfilePictures);



module.exports = router;

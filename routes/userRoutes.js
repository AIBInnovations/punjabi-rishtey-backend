const express = require("express");
const { registerUser, loginUser, searchMatches, getUserProfile, updateUserProfile, uploadProfilePictures,deleteProfilePicture, logoutUser} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", protect, searchMatches);
router.get("/:id", protect, getUserProfile);
router.put("/:id", protect, updateUserProfile); 
router.post("/:id/upload", protect, upload.array("profile_pictures", 10), uploadProfilePictures);
router.delete("/:id/delete-picture", protect, deleteProfilePicture);
router.post("/logout", protect, logoutUser);



module.exports = router;

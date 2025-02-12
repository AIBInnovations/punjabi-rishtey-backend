const User = require("../models/User");
const Family = require("../models/Family");  
const Education = require("../models/Education");  
const Profession = require("../models/Profession");  
const Astrology = require("../models/Astrology");  
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");


const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchMatches = async (req, res) => {
  try {
    const { gender, caste, religion, marital_status, city, minAge, maxAge } = req.query;

    let query = {};

    if (gender) query.gender = gender;
    if (caste) query.caste = caste;
    if (religion) query.religion = religion;
    if (marital_status) query.marital_status = marital_status;
    if (city) query["location.city"] = city;
    if (minAge && maxAge) query.age = { $gte: parseInt(minAge), $lte: parseInt(maxAge) };

    const matches = await User.find(query).select("-password"); // Exclude password
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User Not Found" });

    // ✅ Manually fetch related data
    const family = await Family.findOne({ user_id: req.params.id });
    const education = await Education.findOne({ user_id: req.params.id });
    const profession = await Profession.findOne({ user_id: req.params.id });
    const astrology = await Astrology.findOne({ user_id: req.params.id });

    const profilePicUrl = user.profile_picture ? `${req.protocol}://${req.get("host")}${user.profile_picture}` : null;

    // ✅ Ensure `profile_pictures` is always an array (avoid undefined errors)
    const profilePicturesUrls = Array.isArray(user.profile_pictures) 
      ? user.profile_pictures.map(pic => `${req.protocol}://${req.get("host")}${pic}`)
      : [];

    // ✅ Attach related data to user response
    const userProfile = {
      ...user.toObject(), // Convert Mongoose document to plain object
      profile_picture: profilePicUrl,
      profile_pictures: profilePicturesUrls, // Multiple pics
      family_details: family || null,
      education_details: education || null,
      profession_details: profession || null,
      astrology_details: astrology || null
    };

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: error.message });
  }
};



const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Ensure that only the logged-in user can update their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    // Define allowed fields that users can update
    const allowedUpdates = [
      "name", "gender", "dob", "height", "religion", "mobile",
      "email", "hobbies", "status", "mangalik", "language",
      "marital_status", "birth_details", "physical_attributes",
      "lifestyle", "location"
    ];

    // Filter only the fields that are allowed to be updated
    const updates = {};
    for (const key in req.body) {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    // Update user details in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: error.message });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.params.id;
    const profilePicPath = `/uploads/${req.file.filename}`;

    // Update the user's profile picture in the database
    const updatedUser = await User.findByIdAndUpdate(userId, { profile_picture: profilePicPath }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile picture uploaded successfully", profile_picture: profilePicPath });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: error.message });
  }
};

const uploadMultipleProfilePictures = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const userId = req.params.id;
    const uploadedImages = req.files.map(file => `/uploads/${file.filename}`);

    // ✅ Fetch user from DB
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    // ✅ Append new images to existing ones (instead of replacing them)
    user.profile_pictures = [...(user.profile_pictures || []), ...uploadedImages];
    await user.save();

    res.json({ message: "Profile pictures uploaded successfully", profile_pictures: user.profile_pictures });
  } catch (error) {
    console.error("Error uploading multiple profile pictures:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, searchMatches, getUserProfile, updateUserProfile, uploadProfilePicture,uploadMultipleProfilePictures };

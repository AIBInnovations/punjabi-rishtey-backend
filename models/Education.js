const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  education_level: String,
  education_field: String,
  qualification_details: String,
});

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;

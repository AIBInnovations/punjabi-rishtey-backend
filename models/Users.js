const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  dob: String,
  height: String,
  religion: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
  location: {
    city: String,
    pincode: String,
  },
  hobbies: [String],
  status: String,
  mangalik: Boolean,
  language: String,
  marital_status: String,
  birth_details: {
    birth_time: String,
    birth_place: String,
  },
  physical_attributes: {
    skin_tone: String,
    body_type: String,
    physical_disability: Boolean,
    disability_reason: String,
  },
  lifestyle: {
    smoke: Boolean,
    drink: Boolean,
    veg_nonveg: String,
    nri_status: Boolean,
  },
  metadata: {
    register_date: Date,
    exp_date: Date,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
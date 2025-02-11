const mongoose = require("mongoose");

const professionSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  occupation: String,
  designation: String,
  working_with: String,
  working_as: String,
  income: String,
  work_address: String,
});

const Profession = mongoose.model("Profession", professionSchema);
module.exports = Profession;

const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  family_value: String,
  family_size: Number,
  mother: {
    name: String,
    occupation: String,
  },
  father: {
    name: String,
    occupation: String,
  },
  siblings: {
    brother_count: Number,
    sister_count: Number,
  },
});

const Family = mongoose.model("Family", familySchema);
module.exports = Family;
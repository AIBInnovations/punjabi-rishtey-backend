const mongoose = require("mongoose");

const astrologySchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  rashi_nakshatra: String,
  gotra: String,
  gotra_mama: String,
});

const Astrology = mongoose.model("Astrology", astrologySchema);
module.exports = Astrology;

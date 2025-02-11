const Profession = require("../models/Profession");

const addProfessionDetails = async (req, res) => {
  try {
    const profession = new Profession({ user_id: req.user.id, ...req.body });
    await profession.save();
    res.status(201).json(profession);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfessionDetails = async (req, res) => {
  try {
    const profession = await Profession.findOne({ user_id: req.params.userId });
    if (!profession) return res.status(404).json({ message: "Profession details not found" });
    res.json(profession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addProfessionDetails, getProfessionDetails };

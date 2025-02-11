const Education = require("../models/Education");

const addEducationDetails = async (req, res) => {
  try {
    const education = new Education({ user_id: req.user.id, ...req.body });
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEducationDetails = async (req, res) => {
  try {
    const education = await Education.findOne({ user_id: req.params.userId });
    if (!education) return res.status(404).json({ message: "Education details not found" });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEducationDetails, getEducationDetails };

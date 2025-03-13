const mongoose = require("mongoose");

const StorybookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  authorEmail: { type: String, required: true },
  authorPhoto: { type: String }, // URL for uploaded photo
  description: { type: String, required: true },
  coverImage: { type: String, required: true }, // URL for cover image
  storyFile: { type: String, required: true } // URL for storybook file (PDF)
});

module.exports = mongoose.model("Storybook", StorybookSchema);

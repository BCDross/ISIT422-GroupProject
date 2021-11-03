const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const itemSchema = './item.js';
const userSchema = './user.js';

const ProjectSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  items: {
    type: [itemSchema.id],
  },
  user: {
    type: userSchema.id,
    required: true
  }
});

CardSchema.virtual("url").get(function() {
  return "/projects/" + this._id;
});

module.exports = mongoose.model("Project", ProjectSchema);
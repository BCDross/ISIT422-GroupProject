const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const itemSchema = './item.js';
const userSchema = './user.js';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: false
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

CardSchema.virtual("url").get(function() {
  return "/projects/" + this._id;
});

module.exports = mongoose.model("Project", ProjectSchema);
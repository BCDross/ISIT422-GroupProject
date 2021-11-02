var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

CardSchema.virtual("url").get(function() {
  return "/projects/" + this._id;
});

module.exports = mongoose.model("Project", ProjectSchema);
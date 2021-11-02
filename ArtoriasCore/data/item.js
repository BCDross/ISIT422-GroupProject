const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required:false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

ItemSchema.virtual('url').get(function() {
  return '/items/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);
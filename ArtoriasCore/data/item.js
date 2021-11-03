const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'New'
  },
  priority: {
    type: Number,
    required: true,
    default: 3
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: 'Type cannot be blank'
  },
  parent: {
    type: item,
    required: false
  },
  children: {
    type: [
      item
    ],
    required: false
  },
  owner: {
    type: Number,
    required: true
  }
});

ItemSchema.virtual('url').get(function() {
  return '/items/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);
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
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: false
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: false
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

ItemSchema.virtual('url').get(function() {
  return '/items/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);
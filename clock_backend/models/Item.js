const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for a Timer/item
const itemSchema = new Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  deleteDate: {
    type: Date,
  },
  activeDuration: {
    type: Number,
    default: 0,
  },
  state: {
    type: String, //active
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

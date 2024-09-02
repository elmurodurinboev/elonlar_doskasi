const { Schema, model } = require("mongoose");

const posterScheme = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 50,
  },
  region: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  visits: {
    type: Number,
    default: 1
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Poster", posterScheme);

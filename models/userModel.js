const { Schema, model } = require("mongoose")

const useScheme = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
},
  {
    timestamps: true
  }
)

module.exports = model("User", useScheme)
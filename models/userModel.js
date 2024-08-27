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
  },
  // Bu yerda ikkita tableni bir biriga ulash ko'rsatilgan
  // type sidatida Poster schemedagi id ning typini qabul quladi. Ref fegani ulamoqchi bo'lgan tablening nomi
  posters: [{ type: Schema.Types.ObjectId, ref: "Poster" }]
},
  {
    timestamps: true
  }
)

module.exports = model("User", useScheme)
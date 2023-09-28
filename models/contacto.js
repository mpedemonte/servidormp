const mongoose = require("mongoose");

const ContactoSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    mensaje: String,
  },
  { versionKey: false }
);
module.exports = mongoose.model("Contacto", ContactoSchema);

const mongoose = require("mongoose");

const ServicioSchema = mongoose.Schema(
  {
    title: String,
    miniature: String,
    content: String,
    path: {
      type: String,
      unique: true,
    },
    order: Number,
    active: Boolean,
    description: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Servicio", ServicioSchema);

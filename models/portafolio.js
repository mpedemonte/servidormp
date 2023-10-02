const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PortafolioSchema = mongoose.Schema(
  {
    title: String,
    miniature: String,
    content: String,
    path: {
      type: String,
      unique: true,
    },
    created_at: Date,
    imagen1: String,
    imagen2: String,
    imagen3: String,
    imagen4: String,
    imagen5: String,
    active: Boolean,
    order: Number,
    description: String,
  },
  { versionKey: false }
);

PortafolioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Portafolio", PortafolioSchema);

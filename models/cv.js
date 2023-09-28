const mongoose = require("mongoose");

const CurriculumSchema = mongoose.Schema(
  {
    pdfcv: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Curriculum", CurriculumSchema);

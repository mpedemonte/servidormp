const Curriculum = require("../models/cv");
const pdf = require("../utils/image");
const fs = require("fs");

function createCv(req, res) {
  const cv = new Curriculum(req.body);
  const pdfPath = pdf.getFilePath(req.files.pdfcv);
  cv.pdfcv = pdfPath;

  cv.save()
    .then((cvStored) => {
      res.status(201).send(cvStored);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al crear el CV" });
    });
}

async function getCv(req, res) {
  let response = null;

  response = await Curriculum.findOne();

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado ningun CV" });
  } else {
    res.status(200).send(response);
  }
}

function updateCv(req, res) {
  const { id } = req.params;
  const cvData = req.body;
  let changeCv = false;

  if (req.files.pdfcv) {
    const pdfPath = pdf.getFilePath(req.files.pdfcv);
    cvData.pdfcv = pdfPath;
    changeCv = true;
  }

  Curriculum.findByIdAndUpdate({ _id: id }, cvData)
    .then((data) => {
      res.status(200).send({ msg: "Actualización correcta" });
      if (changeCv && data.pdfcv != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.pdfcv}`);
        } catch (err) {
          console.error("Something wrong happened removing the file", err);
        }
      }
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al actualizar el Cv" });
    });
}

function deleteCv(req, res) {
  const { id } = req.params;

  Curriculum.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).send({ msg: "Cv eliminado" });
      if (data.pdfcv != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.pdfcv}`);
        } catch (err) {
          console.error("Something wrong happened removing the file", err);
        }
      }
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al eliminar el Cv" });
    });
}

module.exports = {
  createCv,
  getCv,
  updateCv,
  deleteCv,
};

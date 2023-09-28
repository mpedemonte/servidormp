const Servicio = require("../models/servicio");
const image = require("../utils/image");
const fs = require("fs");

function createServicio(req, res) {
  const servicio = new Servicio(req.body);
  const imagePath = image.getFilePath(req.files.miniature);
  servicio.miniature = imagePath;

  servicio
    .save()
    .then((servicioStored) => {
      res.status(201).send(servicioStored);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al crear el servicio" });
    });
}

async function getServicios(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await Servicio.find().sort({ order: "asc" });
  } else {
    response = await Servicio.find({ active }).sort({ order: "asc" });
  }

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado ningún servicio" });
  } else {
    res.status(200).send(response);
  }
}

function updateServicio(req, res) {
  const { id } = req.params;
  const servicioData = req.body;
  let changeImage = false;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    servicioData.miniature = imagePath;
    changeImage = true;
  }
  Servicio.findByIdAndUpdate({ _id: id }, servicioData)
    .then((data) => {
      res.status(200).send({ msg: "Actualización correcta" });
      if (changeImage && data.miniature != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.miniature}`);
        } catch {
          console.error("Something wrong happened removing the file", err);
        }
      }
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al actualizar el servicio" });
    });
}

function deleteServicio(req, res) {
  const { id } = req.params;

  Servicio.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).send({ msg: "Servicio eliminado" });
      if (data.miniature != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.miniature}`);
        } catch {
          console.error("Something wrong happened removing the file", err);
        }
      }
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al eliminar el servicio" });
    });
}

function getServicio(req, res) {
  const { path } = req.params;

  Servicio.findOne({ path })
    .then((servicioStored) => {
      if (!servicioStored) {
        res.status(400).send({ msg: "No se ha encontrado el servicio" });
      } else {
        res.status(200).send(servicioStored);
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error del servidor" });
    });
}

module.exports = {
  createServicio,
  getServicios,
  updateServicio,
  deleteServicio,
  getServicio,
};

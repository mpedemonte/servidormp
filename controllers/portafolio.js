const Portafolio = require("../models/portafolio");
const image = require("../utils/image");
const fs = require("fs");

function createPortafolio(req, res) {
  const portafolio = new Portafolio(req.body);
  portafolio.created_at = new Date();
  const miniaturePath = image.getFilePath(req.files.miniature);
  portafolio.miniature = miniaturePath;

  const imagePath1 = image.getFilePath(req.files.imagen1);
  portafolio.imagen1 = imagePath1;

  const imagePath2 = image.getFilePath(req.files.imagen2);
  portafolio.imagen2 = imagePath2;

  const imagePath3 = image.getFilePath(req.files.imagen3);
  portafolio.imagen3 = imagePath3;

  const imagePath4 = image.getFilePath(req.files.imagen4);
  portafolio.imagen4 = imagePath4;

  const imagePath5 = image.getFilePath(req.files.imagen5);
  portafolio.imagen5 = imagePath5;

  portafolio
    .save()
    .then((portafolioStored) => {
      res.status(201).send(portafolioStored);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al crear el portafolio" });
    });
}

function getPortafolios(req, res) {
  const { page = 1, limit = 3 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  Portafolio.paginate({}, options)
    .then((portafolios) => {
      res.status(200).send(portafolios);
    })
    .catch((err) => {
      res.status(400).send("Error al obtener los portafolios");
    });
}

function updatePortafolio(req, res) {
  const { id } = req.params;
  const portafolioData = req.body;
  let changeMiniature = false;
  let changeImage1 = false;
  let changeImage2 = false;
  let changeImage3 = false;
  let changeImage4 = false;
  let changeImage5 = false;

  if (req.files.miniature) {
    const miniaturePath = image.getFilePath(req.files.miniature);
    portafolioData.miniature = miniaturePath;
    changeMiniature = true;
  }

  if (req.files.imagen1) {
    const imagenPath1 = image.getFilePath(req.files.imagen1);
    portafolioData.imagen1 = imagenPath1;
    changeImage1 = true;
  }
  if (req.files.imagen2) {
    const imagenPath2 = image.getFilePath(req.files.imagen2);
    portafolioData.imagen2 = imagenPath2;
    changeImage2 = true;
  }
  if (req.files.imagen3) {
    const imagenPath3 = image.getFilePath(req.files.imagen3);
    portafolioData.imagen3 = imagenPath3;
    changeImage3 = true;
  }
  if (req.files.imagen4) {
    const imagenPath4 = image.getFilePath(req.files.imagen4);
    portafolioData.imagen4 = imagenPath4;
    changeImage4 = true;
  }
  if (req.files.imagen5) {
    const imagenPath5 = image.getFilePath(req.files.imagen5);
    portafolioData.imagen5 = imagenPath5;
    changeImage5 = true;
  }

  Portafolio.findByIdAndUpdate({ _id: id }, portafolioData)
    .then((data) => {
      res.status(200).send({ msg: "Actualización correcta" });
      if (changeMiniature && data.miniature != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.miniature}`);
        } catch {
          console.error("Something wrong happened removing the file", err);
        }
      }

      if (changeImage1 && data.imagen1 != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.imagen1}`);
        } catch {
          console.error("Something wrong happened removing the file", err);
        }
      }

      if (changeImage2 && data.imagen2 != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.imagen2}`);
        } catch {
          console.error("Something wrong happened removing the file", err);
        }
      }

      if (changeImage3 && data.imagen3 != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.imagen3}`);
        } catch {
          console.error("Something wrong happened removing the file", err);
        }
      }

      if (changeImage4 && data.imagen4 != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.imagen4}`);
        } catch {
          console.error("Something wrong happened removing the file", err);
        }
      }

      if (changeImage5 && data.imagen5 != undefined) {
        try {
          fs.unlinkSync(`./uploads/${data.imagen5}`);
        } catch {
          console.error("Something wrong happened removing the file", err);
        }
      }
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al actualizar el portafolio" });
    });
}

function deletePortafolio(req, res) {
  const { id } = req.params;

  Portafolio.findByIdAndDelete(id).then((data) => {
    res.status(200).send({ msg: "Portafolio eliminado" });
    if (data.miniature != undefined) {
      try {
        fs.unlinkSync(`.uploads/${data.miniature}`);
      } catch (err) {
        console.error("Something wrong happened removing the file", err);
      }
    }
    if (data.imagen1 != undefined) {
      try {
        fs.unlinkSync(`.uploads/${data.imagen1}`);
      } catch (err) {
        console.error("Something wrong happened removing the file", err);
      }
    }

    if (data.imagen2 != undefined) {
      try {
        fs.unlinkSync(`.uploads/${data.imagen2}`);
      } catch (err) {
        console.error("Something wrong happened removing the file", err);
      }
    }
    if (data.imagen3 != undefined) {
      try {
        fs.unlinkSync(`.uploads/${data.imagen3}`);
      } catch (err) {
        console.error("Something wrong happened removing the file", err);
      }
    }

    if (data.imagen4 != undefined) {
      try {
        fs.unlinkSync(`.uploads/${data.imagen4}`);
      } catch (err) {
        console.error("Something wrong happened removing the file", err);
      }
    }

    if (data.imagen5 != undefined) {
      try {
        fs.unlinkSync(`.uploads/${data.imagen5}`);
      } catch (err) {
        console.error("Something wrong happened removing the file", err);
      }
    }
  });
}

function getPortafolio(req, res) {
  const { path } = req.params;

  Portafolio.findOne({ path })
    .then((portafolioStored) => {
      if (!portafolioStored) {
        res.status(400).send({ msg: "No se ha encontrado ningun trabajo" });
      } else {
        res.status(200).send(portafolioStored);
      }
    })
    .catch((error) => {
      res.status(500).send({ msg: "Error en el servidor" });
    });
}

module.exports = {
  createPortafolio,
  getPortafolios,
  updatePortafolio,
  deletePortafolio,
  getPortafolio,
};

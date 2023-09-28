const Menu = require("../models/menu");

async function createMenu(req, res) {
  const menu = new Menu(req.body);
  menu
    .save()
    .then((menuStored) => {
      res.status(201).send(menuStored);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al crear el menu" });
    });
}

async function getMenus(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" });
  } else {
    response = await Menu.find({ active }).sort({ order: "asc" });
  }

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado ningún menu" });
  } else {
    res.status(200).send(response);
  }
}

async function updateMenu(req, res) {
  const { id } = req.params;
  const menuData = req.body;

  Menu.findByIdAndUpdate({ _id: id }, menuData)
    .then(() => {
      res.status(200).send({ msg: "Actualizacion correcta" });
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al actualizar el menu" });
    });
}

async function deleteMenu(req, res) {
  const { id } = req.params;

  Menu.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ msg: "Menu eliminado" });
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al eliminar" });
    });
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};

const express = require("express");
const multiparty = require("connect-multiparty");
const ServicioController = require("../controllers/servicio");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/servicio" });

const api = express.Router();

api.post(
  "/servicio",
  [md_auth.asureAuth, md_upload],
  ServicioController.createServicio
);
api.get("/servicio", ServicioController.getServicios);
api.patch(
  "servicio/:id",
  [md_auth.asureAuth, md_upload],
  ServicioController.updateServicio
);
api.delete(
  "/servicio/:id",
  [md_auth.asureAuth],
  ServicioController.deleteServicio
);
api.get("/servicio/:path", ServicioController.getServicio);

module.exports = api;

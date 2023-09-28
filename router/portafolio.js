const express = require("express");
const multiparty = require("connect-multiparty");
const PortafolioController = require("../controllers/portafolio");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/portafolio" });

const api = express.Router();

api.post(
  "/portafolio",
  [md_auth.asureAuth, md_upload],
  PortafolioController.createPortafolio
);
api.get("/portafolio", PortafolioController.getPortafolios);
api.patch(
  "/portafolio/:id",
  [md_auth.asureAuth, md_upload],
  PortafolioController.updatePortafolio
);
api.delete(
  "/portafolio/:id",
  [md_auth.asureAuth],
  PortafolioController.deletePortafolio
);
api.get("/portafolio/:path", PortafolioController.getPortafolio);
module.exports = api;

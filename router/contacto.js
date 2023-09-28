const express = require("express");
const ContactoController = require("../controllers/contacto");

const api = express.Router();

api.post("/email", ContactoController.sendEmail);

module.exports = api;

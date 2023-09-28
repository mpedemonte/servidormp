const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

//rutas
const authRoutes = require("./router/auth");
const menuRoutes = require("./router/menu");
const portafolioRoutes = require("./router/portafolio");
const servicioRoutes = require("./router/servicio");
const cvRoutes = require("./router/cv");
const contactoRoutes = require("./router/contacto");
const userRoutes = require("./router/user");

//body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//static folder
app.use(express.static("uploads"));

//cors
app.use(cors());

//configure routes
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, portafolioRoutes);
app.use(`/api/${API_VERSION}`, servicioRoutes);
app.use(`/api/${API_VERSION}`, cvRoutes);
app.use(`/api/${API_VERSION}`, contactoRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
module.exports = app;

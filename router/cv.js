const express = require("express");
const multiparty = require("connect-multiparty");
const CvController = require("../controllers/cv");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/cv" });

const api = express.Router();

api.post("/cv", [md_auth.asureAuth, md_upload], CvController.createCv);
api.get("/cv", CvController.getCv);
api.patch("/cv/:id", [md_auth.asureAuth, md_upload], CvController.updateCv);
api.delete("/cv/:id", [md_auth.asureAuth], CvController.deleteCv);

module.exports = api;

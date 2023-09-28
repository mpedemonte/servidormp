const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  user.password = hashPassword;

  user
    .save()
    .then((userStorage) => {
      res.status(201).send(userStorage);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al crear el usuario" });
    });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatia" });

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase })
    .then((userStorage) => {
      bcrypt
        .compare(password, userStorage.password)
        .then((check) => {
          if (!check) {
            res.status(400).send({ msg: "contraseña incorrecta" });
          } else if (!userStorage.active) {
            res.status(401).send({ msg: "Usuario no autorizado o no activo" });
          } else {
            res.status(200).send({
              access: jwt.createAccessToken(userStorage),
              refresh: jwt.createRefreshToken(userStorage),
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ msg: err + "Error del servidor2" });
        });
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error en el servidor" });
    });
}

function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "Token requerido" });

  const { user_id } = jwt.decoded(token);

  User.findOne({ _id: user_id })
    .then((userStorage) => {
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStorage),
      });
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error del servidor" });
    });
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};

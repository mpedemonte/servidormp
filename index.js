const mongoose = require("mongoose");
const app = require("./app");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  IP_SERVER,
  API_VERSION,
} = require("./constants");

const PORT = process.env.POST || 3977;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    app.listen(PORT, "0.0.0.0", () => {
      console.log("####################");
      console.log("##### API REST #####");
      console.log("####################");
      console.log(`http://localhost:${PORT}/api/${API_VERSION}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos", err);
  });

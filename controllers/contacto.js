const Contacto = require("../models/contacto");

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("../account_transport.json");

async function sendEmail(req, res) {
  const { name, email, phone, mensaje } = req.body;
  const contentHtml = `
    <h1> Formulario de Contacto</h1>
    <ul>
        <li>name: ${name}</li>
        <li>email: ${email}</li>
        <li>telefono: ${phone}</li>
    </ul>
    <p>${mensaje}</p>
    `;
  const CLIENT_ID = accountTransport.auth.clientId;
  const CLIENT_SECRET = accountTransport.auth.clientSecret;
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN = accountTransport.auth.refreshToken;

  const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const token = await oauth2Client.getAccessToken();
    accountTransport.auth.accessToken = token;
    const transport = nodemailer.createTransport(accountTransport);
    const mailOptions = {
      from: "Web Personal <mpedemonte94@gmail.com>",
      to: "marco.pedemonte.94@gmail.com",
      subject: "Contacto Web Personal",
      html: contentHtml,
    };
    const result = await transport.sendMail(mailOptions);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ msg: "Error al enviar correo" });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sendEmail,
};

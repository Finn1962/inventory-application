const path = require("path");
const express = require("express");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const { loginRouter } = require("./routers/loginRouter.js");
const { registerRouter } = require("./routers/registerRouter.js");

const app = express();
const port = process.env.PORT;

// Einstellungen
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routen
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

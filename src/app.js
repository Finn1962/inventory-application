const path = require("path");

const express = require("express");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const session = require("express-session");

const { loginRouter } = require("./routers/loginRouter.js");
const { registerRouter } = require("./routers/registerRouter.js");
const { homeRouter } = require("./routers/homeRouter.js");
const { productsRouter } = require("./routers/productsRouter.js");
const { categorysRouter } = require("./routers/categoryRouter.js");

const app = express();

// Einstellungen
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 Stunde
    },
  }),
);

// Routen
app.get("/", (req, res) => res.redirect("/home"));
app.use("/home", homeRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/products", productsRouter);
app.use("/categorys", categorysRouter);

module.exports = { app };

const express = require("express");

const registerRouter = express.Router();

const {
  validateRegister,
  handleRegisterValidationErrors,
} = require("../middlewares/validation.js");

const { addUser } = require("../db/queries.js");

const { hashPasswort } = require("../middlewares/hash.js");

registerRouter.get("/", (req, res) => {
  res.render("register", { error: "" });
});

registerRouter.post(
  "/",

  validateRegister,

  handleRegisterValidationErrors,

  hashPasswort,

  (req, res, next) => {
    addUser({
      username: req.body.username,
      email: req.body.email,
      password_hash: req.body.hash,
    })
      .then(() => next())
      .catch((error) => {
        if (error.constraint === "users_username_key")
          res.render("register", { error: "Username is already taken" });
        else if (error.constraint === "users_email_key")
          res.render("register", { error: "Email is already taken" });
        else res.render("register", { error: "Error adding user" });
      });
  },

  (req, res) => {
    res.redirect("/home");
  },
);

module.exports = { registerRouter };

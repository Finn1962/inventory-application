const express = require("express");

const loginRouter = express.Router();

const { authenticateUser } = require("../middlewares/hash.js");

const {
  validateLogin,
  handleLoginValidationErrors,
} = require("../middlewares/validation.js");

loginRouter.get("/", (req, res) => {
  res.render("login", { error: "" });
});

loginRouter.post(
  "/",
  validateLogin,
  handleLoginValidationErrors,
  authenticateUser,
  (req, res) => {
    res.redirect("/home");
  },
);

module.exports = { loginRouter };

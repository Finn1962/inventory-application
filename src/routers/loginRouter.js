const express = require("express");
const loginRouter = express.Router();
const { showLogin, handleLogin } = require("../controllers/loginController.js");
const { hashPasswort, authenticateUser } = require("../middlewares/hash.js");
const {
  validateLogin,
  handleValidationErrors,
} = require("../middlewares/validation.js");

loginRouter.get("/", showLogin);

loginRouter.post(
  "/",
  validateLogin,
  handleValidationErrors,
  authenticateUser,
  handleLogin,
);

module.exports = { loginRouter };

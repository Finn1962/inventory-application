const express = require("express");
const loginRouter = express.Router();
const { showLogin, handleLogin } = require("../controllers/loginController.js");
const { authenticateUser } = require("../middlewares/hash.js");
const {
  validateLogin,
  handleLoginValidationErrors,
} = require("../middlewares/validation.js");

loginRouter.get("/", showLogin);

loginRouter.post(
  "/",
  validateLogin,
  handleLoginValidationErrors,
  authenticateUser,
  handleLogin,
);

module.exports = { loginRouter };

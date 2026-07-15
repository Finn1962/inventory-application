const express = require("express");

const {
  showRegister,
  handleRegister,
} = require("../controllers/registerController");
const registerRouter = express.Router();

const {
  validateRegister,
  handleRegisterValidationErrors,
} = require("../middlewares/validation.js");

const {
  addUserToDB,
  isUserExisting,
} = require("../middlewares/userManagement.js");

const { hashPasswort } = require("../middlewares/hash.js");

registerRouter.get("/", showRegister);
registerRouter.post(
  "/",
  validateRegister,
  handleRegisterValidationErrors,
  hashPasswort,
  isUserExisting,
  addUserToDB,
  handleRegister,
);

module.exports = { registerRouter };

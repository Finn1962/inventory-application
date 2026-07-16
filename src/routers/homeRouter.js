const express = require("express");

const homeRouter = express.Router();

const {
  showHome,
  redirectToLogin,
} = require("../controllers/homeController.js");

const { isAuthenticated } = require("../middlewares/isAuthenticated.js");

const { clearSession } = require("../middlewares/clearSession.js");

homeRouter.get("/", isAuthenticated, showHome);
homeRouter.get("/logout", clearSession, redirectToLogin);

module.exports = { homeRouter };

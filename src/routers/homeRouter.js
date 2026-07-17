const express = require("express");

const homeRouter = express.Router();

const { getAllProductsByUserId } = require("../db/queries.js");

homeRouter.get(
  "/",
  (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    next();
  },

  async (req, res) => {
    res.render("home", {
      username: req.session.user.username,
      products: await getAllProductsByUserId(req.session.user.id),
    });
  },
);

homeRouter.get(
  "/logout",

  (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send("Error clearing session");
      }

      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  },
);

module.exports = { homeRouter };

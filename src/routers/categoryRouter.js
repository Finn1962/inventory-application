const express = require("express");

const categorysRouter = express.Router();

const { addCategory } = require("../db/queries.js");

categorysRouter.post(
  "/new",

  async (req, res, next) => {
    try {
      await addCategory({ name: req.body.name, user_id: req.session.user_id });
    } catch {
      req.render("newCategoryForm", { error: "Error creating new Category" });
    }
    next();
  },

  (req, res) => {
    res.redirect("/home");
  },
);

module.exports = { categorysRouter };

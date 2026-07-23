const express = require("express");

const categorysRouter = express.Router();

const { addCategory, removeCategory } = require("../db/queries.js");

categorysRouter.post(
  "/new",

  async (req, res, next) => {
    try {
      await addCategory({ name: req.body.name, user_id: req.session.user.id });
    } catch {
      req.render("newCategoryForm", { error: "Error creating new Category" });
    }
    next();
  },

  (req, res) => {
    res.redirect("/home");
  },
);

categorysRouter.post(
  "/delete",

  async (req, res, next) => {
    try {
      await removeCategory({
        user_id: req.session.user.id,
        category_id: req.body.id,
      });
    } catch {
      res.redirect("/home?error=errorDeleteCategory");
    }
    next();
  },

  (req, res) => {
    res.redirect("/home");
  },
);

module.exports = { categorysRouter };

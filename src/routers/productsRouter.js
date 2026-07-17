const express = require("express");
const productsRouter = express.Router();

const { addProduct } = require("../db/queries.js");

productsRouter.get("/new", (req, res) => {
  res.render("newProductForm", {});
});

productsRouter.post(
  "/new",
  async (req, res, next) => {
    console.log("amena zikim");
    addProduct({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      user_id: req.session.user.id,
      brand: req.body.brand,
    })
      .then(() => next())
      .catch(() => next());
  },
  (req, res) => {
    res.redirect("/home");
  },
);

module.exports = { productsRouter };

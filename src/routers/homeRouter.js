const express = require("express");

const homeRouter = express.Router();

const {
  getAllProductsByUserId,
  getInternUrl: getInternImageUrl,
} = require("../db/queries.js");

const { checkLogin } = require("../middlewares/checkLogin.js");

const { getImageUrl } = require("../supabase/supabaseController.js");

homeRouter.get(
  "/",

  checkLogin,

  async (req, res, next) => {
    try {
      const renderData = {
        username: req.session.user.username,
        products: await getAllProductsByUserId(req.session.user.id),
      };

      await Promise.all(
        renderData.products.map(async (product) => {
          const internImageUrl = await getInternImageUrl(product.id);
          const imageUrl = await getImageUrl(internImageUrl);
          product.image_url = imageUrl;
          return;
        }),
      );

      req.renderData = renderData;
      next();
    } catch (error) {
      console.error(error);
      res.render("home", {
        username: req.session.user.username,
        error: "Could not load products.",
        products: [],
      });
    }
  },

  (req, res, next) => {
    const errorParam = req.query.error;
    if (errorParam) {
      res.render("home", {
        error: "Could not delete Product.",
        ...req.renderData,
      });
    } else {
      next();
    }
  },

  (req, res) => {
    res.render("home", req.renderData);
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

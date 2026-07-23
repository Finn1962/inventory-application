const express = require("express");

const multer = require("multer");

const productsRouter = express.Router();

const {
  addProduct,
  removeProduct,
  addInternImageUrl,
} = require("../db/queries.js");

const {
  uploadImage,
  //getImageUrl,
} = require("../supabase/supabaseController.js");

const upload = multer({ storage: multer.memoryStorage() }).array("images");

productsRouter.get("/new", (req, res) => {
  res.render("newProductForm", { error: "" });
});

productsRouter.post(
  "/new",

  upload,

  async (req, res, next) => {
    try {
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        imageUrls = await Promise.all(
          req.files.map((file) => uploadImage(file)),
        );
      }

      const productId = await addProduct({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        user_id: req.session.user.id,
        brand: req.body.brand,
      });

      if (imageUrls.length > 0) {
        await Promise.all(
          imageUrls.map((url) =>
            addInternImageUrl({
              url: url,
              product_id: productId,
            }),
          ),
        );
      }

      next();
    } catch (error) {
      error;
      return res.render("newProductForm", {
        error: "Error adding the product",
      });
    }
  },

  (req, res) => {
    res.redirect("/home");
  },
);

productsRouter.post(
  "/delete",
  async (req, res, next) => {
    removeProduct({
      user_id: req.session.user.id,
      product_id: req.body.product_id,
    }).then(() => next());
  },
  (req, res) => {
    res.redirect("/home");
  },
);

module.exports = { productsRouter };

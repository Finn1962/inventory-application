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
      const productId = await addProduct({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        user_id: req.session.user.id,
        brand: req.body.brand,
      });

      //console.log("id ist: ", productId);

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const internImageUrl = await uploadImage(file);
            await addInternImageUrl(internImageUrl, productId);
          }),
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
    console.log("Erfolg");
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

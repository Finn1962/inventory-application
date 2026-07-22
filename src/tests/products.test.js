const request = require("supertest");

const { uploadImage } = require("../supabase/supabaseController.js");

jest.mock("../db/queries.js", () => ({
  addProduct: jest.fn(),
  addInternImageUrl: jest.fn(),
}));

jest.mock("../supabase/supabaseController.js", () => ({
  uploadImage: jest.fn(),
}));

jest.mock("express-session", () => {
  return () => (req, res, next) => {
    req.session = {
      user: { id: 1 },
    };
    next();
  };
});

const { addProduct, addInternImageUrl } = require("../db/queries.js");

const { app } = require("../app.js");

describe("POST /products", () => {
  test("should add product", async () => {
    uploadImage.mockResolvedValue();
    addProduct.mockResolvedValue();
    addInternImageUrl.mockResolvedValue();

    const response = await request(app)
      .post("/products/new")
      .field("name", "tab a")
      .field("description", "great product")
      .field("price", 99.99)
      .field("brand", "samsung")
      .attach("images", Buffer.from("fake-image-data"), "test-image.png");

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/home");
  });
});

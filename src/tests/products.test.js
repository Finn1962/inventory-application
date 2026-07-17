const request = require("supertest");

jest.mock("../db/queries.js", () => ({
  addProduct: jest.fn(),
}));

const { addProduct } = require("../db/queries.js");

const { app } = require("../app.js");

describe("produktrouter", () => {
  test("produktoutertest", async () => {
    addProduct.mockResolvedValue();

    const response = await request(app).post("/products/new").send({
      name: "tab a",
      description: "tolles produkt",
      price: 99.99,
      user_id: 1,
      brand: "samsung",
    });
  });
});

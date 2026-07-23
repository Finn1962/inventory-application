const request = require("supertest");
const { app } = require("../app.js");

const { addCategory, removeCategory } = require("../db/queries.js");

jest.mock("../db/queries.js", () => ({
  addCategory: jest.fn(),
  removeCategory: jest.fn(),
}));

jest.mock("express-session", () => {
  return () => (req, res, next) => {
    req.session = {
      user: { id: 1, username: "test_user" },
    };
    next();
  };
});

describe("/category", () => {
  test("should add new category", async () => {
    addCategory.mockResolvedValue();

    const response = await request(app)
      .post("/categorys/new")
      .send({ name: "phones" });

    expect(addCategory).toHaveBeenCalledWith({ name: "phones", user_id: 1 });
    expect(response.header.location).toBe("/home");
    expect(response.statusCode).toBe(302);
  });

  test("should remove category", async () => {
    removeCategory.mockResolvedValue();
    const response = await request(app)
      .post("/categorys/delete")
      .send({ id: 1 });

    expect(removeCategory).toHaveBeenCalledWith({
      user_id: 1,
      category_id: 1,
    });

    console.log(response.header);
    expect(response.header.location).toBe("/home");
    expect(response.statusCode).toBe(302);
  });
});

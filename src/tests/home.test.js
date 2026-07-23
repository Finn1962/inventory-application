const request = require("supertest");
const { app } = require("../app.js");

const { getAllProductsByUserId, getInternUrl } = require("../db/queries.js");

jest.mock("../db/queries.js", () => ({
  getAllProductsByUserId: jest.fn(),
  getInternUrl: jest.fn(),
}));

jest.mock("express-session", () => {
  return () => (req, res, next) => {
    req.session = {
      user: { id: 1, username: "Finn Schmidt" },
    };
    next();
  };
});

describe("GET /", () => {
  getAllProductsByUserId.mockResolvedValue([
    {
      id: 50,
      name: "iphone xs",
      description: "good stuf",
      price: 1.0,
      user_id: 1,
      brand: "apple",
    },
    {
      id: 52,
      name: "galaxy ultra",
      description: "also good stuf",
      price: 2.0,
      user_id: 1,
      brand: "samsung",
    },
  ]);

  getInternUrl.mockResolvedValue("exampleURL");

  test("should show home", async () => {
    const response = await request(app).get("/home");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("iphone xs");
    expect(response.text).toContain("galaxy ultra");
  });
});

const request = require("supertest");
const { app } = require("../app");

const { getUserByUsername } = require("../db/queries.js");

jest.mock("../db/queries.js", () => ({
  getUserByUsername: jest.fn(),
}));

describe("POST /login", () => {
  getUserByUsername.mockResolvedValue([
    {
      id: 1,
      username: "testuser",
      password_hash:
        "$2b$12$AoTpTgZ/HqWo0Z33BopUke/tnytZ9oYLy5YEPh4tUQ/f4.wS/yXVK",
    },
  ]);

  test("should login user with correct credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "admin123",
    });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/home");
  });

  test("should login user with correct credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "wrong_password",
    });

    console.log(response.text);

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Invalid username or password");
  });
});

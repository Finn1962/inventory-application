const request = require("supertest");
const { app } = require("../app.js");

const { addUser, getUserByUsername } = require("../db/queries.js");

jest.mock("../db/queries.js", () => ({
  addUser: jest.fn(),
  getUserByUsername: jest.fn(),
}));

describe("POST /register", () => {
  test("should register new user", async () => {
    addUser.mockResolvedValue();
    getUserByUsername.mockResolvedValue([]);

    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "test@gmail.com",
      password: "admin123",
      confirmPassword: "admin123",
    });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/home");
  });

  test("should not register new user, because username is taken", async () => {
    addUser.mockRejectedValue({
      constraint: "users_username_key",
    });
    getUserByUsername.mockResolvedValue([
      {
        id: 1,
        username: "testuser",
        password_hash:
          "$2b$12$AoTpTgZ/HqWo0Z33BopUke/tnytZ9oYLy5YEPh4tUQ/f4.wS/yXVK",
      },
    ]);

    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "test@gmail.com",
      password: "admin123",
      confirmPassword: "admin123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Username is already taken");
  });
});

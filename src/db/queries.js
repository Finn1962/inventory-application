const pool = require("./pool.js");

async function getUserByUsername(username) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = ($1)",
      [username],
    );
    return rows;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

async function addUser({ username, email, password_hash }) {
  try {
    await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
      [username, email, password_hash],
    );
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

async function addProduct({ name, description, price, user_id, brand }) {
  try {
    await pool.query(
      "insert into products (name , description, price, user_id, brand) VALUES ($1, $2, $3, $4, $5)",
      [name, description, price, user_id, brand],
    );
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

async function getProductByName({ user_id, product_name }) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE user_id = ($1) AND name = ($2)",
      [user_id, product_name],
    );
    return rows;
  } catch (error) {
    console.error("Error getting all products from user:", error);
    throw error;
  }
}

async function getAllProductsByUserId(user_id) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE user_id = ($1)",
      [user_id],
    );
    return rows;
  } catch (error) {
    console.error("Error getting all products from user:", error);
    throw error;
  }
}

module.exports = {
  getUserByUsername,
  addUser,
  addProduct,
  getProductByName,
  getAllProductsByUserId,
};

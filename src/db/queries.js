const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function getUserByUsername(username) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = ($1)",
      [username],
    );
    return rows;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    throw error;
  }
}

async function addProduct({ name, description, price, user_id, brand }) {
  try {
    const { rows } = await pool.query(
      "insert into products (name , description, price, user_id, brand) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, description, price, user_id, brand],
    );
    return rows[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function removeProduct({ user_id, product_id }) {
  try {
    await pool.query(
      "DELETE FROM products WHERE user_id = ($1) AND id = ($2)",
      [user_id, product_id],
    );
  } catch (error) {
    console.error(error);
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
    console.error(error);
    throw error;
  }
}

async function addInternImageUrl({ url, product_id }) {
  try {
    await pool.query(
      "INSERT INTO intern_image_urls (url, product_id) VALUES ($1, $2)",
      [url, product_id],
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getInternUrl(product_id) {
  try {
    const { rows } = await pool.query(
      "SELECT (url) FROM intern_image_urls WHERE product_id = ($1)",
      [product_id],
    );
    return rows[0].url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getUserByUsername,
  addUser,
  addProduct,
  removeProduct,
  getAllProductsByUserId,
  addInternImageUrl,
  getInternUrl,
  pool,
};

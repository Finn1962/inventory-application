const { Client } = require("pg");

const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

async function createTables() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password_hash TEXT NOT NULL
  );`);

  await client.query(` 
  CREATE TABLE IF NOT EXISTS categorys (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`);

  await client.query(`  
  CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      category_id INT,
      name VARCHAR(255) NOT NULL,
      brand VARCHAR(255) NOT NULL, 
      description TEXT,
      price INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categorys(id) ON DELETE CASCADE
  );`);

  await client.query(` 
  CREATE TABLE IF NOT EXISTS intern_image_urls (
      id SERIAL PRIMARY KEY,
      product_id INT NOT NULL,
      url TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );`);

  await client.end();

  console.log("Created tabels");
}

(async () => await createTables())();

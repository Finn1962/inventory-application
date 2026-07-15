const pool = require("./pool.js");

async function getUserByUsername(username) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = ($1)",
      [username],
    );
    return rows;
  } catch (error) {
    console.error("Fehler beim Abrufen des Benutzers:", error);
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
    console.error("Fehler beim Hinzufügen des Benutzers:", error);
    throw error;
  }
}

module.exports = { getUserByUsername, addUser };

const { addUser, getUserByUsername } = require("../db/queries.js");

async function isUserExisting(req, res, next) {
  const userData = await getUserByUsername(req.body.username);
  if (userData.length > 0) {
    return res.render("register", { error: "Username is already taken" });
  }
  next();
}

async function addUserToDB(req, res, next) {
  try {
    await addUser({
      username: req.body.username,
      email: req.body.email,
      password_hash: req.hash,
    });
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Benutzers:", error);
    return res.render("register", { error: "Error adding user to database" });
  }
  next();
}

module.exports = { addUserToDB, isUserExisting };

const bcrypt = require("bcrypt");
const { getUserByUsername } = require("../db/queries.js");
const saltRounds = 12;

async function hashPasswort(req, res, next) {
  const hash = await bcrypt.hash(req.body.password, saltRounds);
  req.hash = hash;
  next();
}

async function authenticateUser(req, res, next) {
  const userData = await getUserByUsername(req.body.username);

  if (userData.length === 0)
    return res.render("login", { error: "Incorrect password or name" });

  const isMatch = await bcrypt.compare(
    req.body.password,
    userData[0].password_hash,
  );
  if (!isMatch)
    return res.render("login", { error: "Incorrect password or name" });

  next();
}

module.exports = { hashPasswort, authenticateUser };

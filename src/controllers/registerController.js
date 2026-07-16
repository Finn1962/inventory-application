function showRegister(req, res) {
  res.render("register", { error: "" });
}

function handleRegister(req, res) {
  res.redirect("/home");
}

module.exports = { showRegister, handleRegister };

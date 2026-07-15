function showRegister(req, res) {
  res.render("register", { error: "" });
}

function handleRegister(req, res) {
  res.send("Registrierung erfolgreich!");
}

module.exports = { showRegister, handleRegister };

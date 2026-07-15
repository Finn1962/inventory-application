function showLogin(req, res) {
  res.render("login", { error: "" });
}

function handleLogin(req, res) {
  res.send("eingeloggt");
}

module.exports = { showLogin, handleLogin };

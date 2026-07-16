function showLogin(req, res) {
  res.render("login", { error: "" });
}

function handleLogin(req, res) {
  res.redirect("/home");
}

module.exports = { showLogin, handleLogin };

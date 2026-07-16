function showHome(req, res) {
  res.render("home", { user: req.session.user });
}

function redirectToLogin(req, res) {
  res.redirect("/login");
}

module.exports = { showHome, redirectToLogin };

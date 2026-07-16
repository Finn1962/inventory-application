function clearSession(req, res, next) {
  req.session.destroy((error) => {
    if (error) return res.status(500).send("Error clearing session");
  });

  res.clearCookie("connect.sid");
  next();
}

module.exports = { clearSession };

const { body, validationResult } = require("express-validator");

const validateLogin = [
  body("username").notEmpty().withMessage("Username can not be empty."),
  body("password").notEmpty().withMessage("Password can not be empty."),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("login", {
      error: errors.array()[0].msg,
    });
  }

  next();
}

const validateRegister = [
  body("username").notEmpty().withMessage("Username can not be empty."),
  body("username")
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be between 2 and 30 characters long."),
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password").notEmpty().withMessage("Password can not be empty."),
  body("password")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8 and 30 characters long."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

function handleRegisterValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("register", {
      error: errors.array()[0].msg,
    });
  }

  next();
}

module.exports = {
  validateLogin,
  handleValidationErrors,
  validateRegister,
  handleRegisterValidationErrors,
};

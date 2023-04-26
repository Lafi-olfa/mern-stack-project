const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("fullName", "is required").notEmpty(),
  check("email", "enter valid email").isEmail(),
  check("email", "not empty").notEmpty(),
  check("password", "is required").notEmpty(),
  check("password", "min 6 charachter").isLength({ min: 6 }),
];

exports.validatorMiddle = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(406).json({ errors: errors.array() });
};

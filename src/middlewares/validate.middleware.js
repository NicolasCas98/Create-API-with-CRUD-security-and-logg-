const { validationResult } = require("express-validator");
const { ValidationError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ValidationError(errors.array())
    );
  }

  next();
};
const logger = require("../utils/logger");
const { ValidationError } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
};
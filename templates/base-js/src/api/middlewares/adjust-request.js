const wrapAsync = require('../../services/async/wrap-async');
const ErrorResponse = require('../../services/error/structure/error-response');

exports.adjustFunction = (req, res, next) => {
  next();
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);

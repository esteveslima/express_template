const wrapAsync = require('../../helpers/async/wrap-async');
const ErrorResponse = require('../../helpers/error/structure/error-response');

exports.validateFunction = (req, res, next) => {
  next();
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);

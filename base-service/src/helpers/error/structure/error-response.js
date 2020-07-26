// Class wraping error responses
const errorCodes = require('./error-codes');

class ErrorResponse extends Error {
  constructor(error, result) {
    super();
    this.error = error;
    this.result = result;
  }
}

ErrorResponse.errorCodes = errorCodes;

ErrorResponse.parse = (err) => {
  // If not a manually thrown ErrorResponse object...
  // tests the error and parse to a proper ErrorResponse object
  if (!(err instanceof ErrorResponse)) {
    const errorCode = errorCodes.INTERNAL_SERVER_ERROR;
    const errorResult = `${err}`;

    /* if (err) {
      errorCode = ;
      errorResult = ;
    } else if (err) {

    } else if (err) {

    } */

    return new ErrorResponse(errorCode, errorResult);
  }
  return { ...err };
};

module.exports = ErrorResponse;

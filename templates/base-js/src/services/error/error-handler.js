const ErrorResponse = require('./structure/error-response');
const stackTrace = require('./stack-trace');
const winston = require('../log/winston');

const errorsFileLogger = winston.loggers.get('errorsFileLogger');
const errorsConsoleLogger = winston.loggers.get('errorsConsoleLogger');

module.exports = (err, req, res, next) => {
  // Last error trace
  const lastTrace = stackTrace.lastErrorTrace(err);
  const trace = {
    file: lastTrace ? lastTrace.getFileName() : '?',
    function: lastTrace ? lastTrace.getFunctionName() : '?',
    position: {
      line: lastTrace ? lastTrace.getLineNumber() : '?',
      column: lastTrace ? lastTrace.getColumnNumber() : '?',
    },
  };

  // Maps the error and parses it to an appropriate ErrorResponse object, if it is not already
  const errorResponse = ErrorResponse.parse(err);

  // Logging the ErrorResponse object
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const message = `
    Error: [${errorResponse.error.errorCode}] from client [${clientIp}].
    Result: [${JSON.stringify(errorResponse.result)}].
    Position [row,col] = [${trace.position.line},${trace.position.column}] from file [${trace.file}].
    Function: [${trace.function}]`;
  if (process.env.NODE_ENV !== 'production') {
    const consoleMessage = message;
    errorsConsoleLogger.error(consoleMessage);
  } else if (process.env.LOGGING === 'true') {
    const logMessage = message.replace(/(\r\n|\n|\r)/gm, '');
    errorsFileLogger.error(logMessage);
  }

  // Response based on the ErrorResponse object
  res.status(errorResponse.error.httpCode).json({
    Status: false,
    Error: errorResponse.error.errorCode,
    Message: errorResponse.error.message,
  });
};

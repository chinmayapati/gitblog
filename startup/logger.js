const winston = require("winston");
const path = require("path");

// custom settings for each transport (file, console)
var options = {
    file: {
      level: 'info', // log info, warn and error
      filename: path.join(process.cwd(), `logs/gitblog.log`),
      handleExceptions: true,
      json: true,
      maxsize: 5242880*2, // 10MB
      maxFiles: 10,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  // instantiate a new Winston Logger with the settings defined above
  let logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

  // create a stream object with a 'write' function that will be used by `morgan`
  logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
  };

  module.exports = logger;
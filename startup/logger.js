const winston = require("winston");
const path = require("path");

module.exports = function() {

    // Initialize Logger
    winston.add(new winston.transports.File({filename: path.join(process.cwd(), `logs/error.log`), level: "error"}));
    // winston.add(new winston.transports.File({filename: path.join(process.cwd(), `logs/debug.log`), level: "debug"}));
    // winston.add(new winston.transports.File({filename: path.join(process.cwd(), `logs/info.log`), level: "info"}));
    winston.add(new winston.transports.File({filename: path.join(process.cwd(), `logs/gitblog.log`)}));
    winston.exceptions.handle( new winston.transports.File({filename: "../logs/uncaughtExceptions.log"}) );
    return winston;

};
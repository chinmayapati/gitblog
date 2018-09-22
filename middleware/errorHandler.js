const debug = require("debug")("gitblog:error");

const errorInfo = {
    // Client Error
    400: {
        errorCode: 400,
        errorType: "Bad Request",
        errorMessage: "The request is not valid. Plese check the query/parameters."
    },
    401: {
        errorCode: 401,
        errorType: "Unathorized",
        errorMessage: "You're not authorized to access this resource on the server. Please contact Administrator to grant access."
    },
    403: {
        errorCode: 403,
        errorType: "Forbidden",
        errorMessage: "You're not authorized to access this resource on the server. Unable to verify user."
    },
    404: {
        errorCode: 404,
        errorType: "Not Found",
        errorMessage: "The requested resource is not available on the server."
    },
    413: {
        errorCode: 413,
        errorType: "Playload Too Large",
        errorMessage: "Unable to accept payload. Payload size too large."
    },
    429: {
        errorCode: 429,
        errorType: "Too many requests",
        errorMessage: "You've exceeded request limit. Please try after sometime."
    },

    // Server Error
    500: {
        errorCode: 500,
        errorType: "Internal Server Error",
        errorMessage: "Unable to process your request at the moment. Please try again after sometime."
    },
    501: {
        errorCode: 501,
        errorType: "Method not supported",
        errorMessage: "The request method is not supported by this server."
    },
    502: {
        errorCode: 502,
        errorType: "Bad Gateway",
        errorMessage: "Unable to process your request at the moment. Please try again after sometime."
    },
    503: {
        errorCode: 503,
        errorType: "Service not implemented",
        errorMessage: "Service not available at the moment. PLease try after sometime."
    },

    // Mongoose Error
    11000: {
        errorCode: 400,
        errorType: "Database Error",
        errorMessage: "The record already exists in the database."
    },

    // Custom Error
    900: {
        errorCode: 900,
        errorType: "Bad JSON",
        errorMessage: "Unable to process request. Invalid JSON payload supplied."
    }
};

module.exports = {
    postErrorHandler: function (req, res, next) {
        req.error = req.error || 500;
        let error = errorInfo[req.error];
        req.errorMessage && (error.errorMessage = req.errorMessage);

        // Log error to file
        winston.error(error.errorType, error); // error, warn, info, verbose. debug, silly

        return res.status(error.errorCode).json(error);
    },

    postProcessErrorHandler: function (err, req, res, next) {
        // Log to console
        debug("postProcessError", err.message);

        let error = errorInfo[500];
        if (err && err.code && errorInfo[err.code]) {
            error = errorInfo[err.code];
            // Log error to file
            winston.error(error.errorType, error); // error, warn, info, verbose. debug, silly

            return res.status(error.errorCode).json(error);
        }

        // Log error to file
        winston.error(err.message, err); // error, warn, info, verbose. debug, silly

        return res.status(error.errorCode).json(error);
    },

    preErrorHandler: function (err, req, res, next) {
        // JSON parse failed in req.body
        if (err instanceof SyntaxError && err.type == "entity.parse.failed")
            return res.status(900).json(errorInfo[900]);
    },

    errorCodes: errorInfo
};
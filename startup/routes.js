const debug = require("debug")("gitblog:routes");

// Load Middlewares
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("../middleware/errorHandler");
const logger = require("../startup/logger");

module.exports = function (app) {

    // Enable CORS: Cross Origin Resource Sharing
    app.use(cors());

    // Enable x-auth-token in header
    app.all("*", (req, res, next) => {
        res.header("Access-Control-Expose-Headers", "x-auth-token");
        next();
    });

    // Use Middlewares
    app.use(helmet()); // protect http headers
    app.use(express.json()); // parse json from body
    app.use(express.urlencoded({
        extended: true
    })); // parse incoming requests with urlencoded payloads

    // Log requests in development mode
    if (app.get("env") == "development") {
        app.use(morgan('[:date] :remote-addr ":method :url HTTP/:http-version" :status', {
            stream: logger.stream
        }));
        debug("Morgan started in development server...");
    }

    app.use(function (err, req, res, next) {
        // JSON parse failed in req.body
        if (err instanceof SyntaxError && err.type == "entity.parse.failed")
            return res.status(500).json({
                errorCode: 500,
                errorType: "Internal Server Error",
                errorMessage: "Unable to process your request at the moment. Please try again after sometime."
            });
    });

    // Setting up routes
    app.all("*", (req, res) => {
        res.status(400).json({
            errorCode: 404,
            errorType: "Not Found",
            errorMessage: "The requested resource is not available on the server."
        });
    });

    // Global ErrorHandler
    app.use(errorHandler);

}
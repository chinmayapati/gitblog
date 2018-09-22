const debug = require("debug")("gitblog:routes");

// Load Middlewares
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { preErrorHandler, postErrorHandler, errorCodes } = require("../middleware/errorHandler");

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
        app.use(morgan('[:date] :remote-addr ":method :url HTTP/:http-version" :status'));
        debug("Morgan started in development server...");
    }

    // Global PreError Handler
    app.use(preErrorHandler);

    // Setting up routes
    app.all("*", (req, res, next) => {
        req.error = 404;
        next();
    });

    // Global PostError Handler
    app.use(postErrorHandler);

}
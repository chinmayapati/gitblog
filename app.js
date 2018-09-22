const express = require("express");
const app = express();
const debug = require("debug")("gitblog:app");

// Load Logger
const logger = require("./startup/logger")();

// Load Process configuration
require("./startup/process");
logger.info("Loaded process configuration.");

// Load App configuration
require("./startup/config");
logger.info("Loaded app configuration.");

// Load Database configuration
require("./startup/database");
logger.info("Loaded database configuration.");

// Load Routes
require("./startup/routes")(app);
logger.info("Loaded routes configuration.");

// Start the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    debug(`Server listening on port ${PORT}...`);
    logger.info(`Server listening on port ${PORT}.`);
});
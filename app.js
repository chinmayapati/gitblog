const express = require("express");
const app = express();
const debug = require("debug")("gitblog:app");

// Initialize Loggee
require("./startup/logger");

// Load Process configuration
require("./startup/process");

// Load App configuration
require("./startup/config");

// Load Database configuration
require("./startup/database");

// Load Routes
require("./startup/routes")(app);

// Start the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    debug(`Server listening on port ${PORT}...`);
});
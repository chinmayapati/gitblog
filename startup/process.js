const debug = require("debug")("gitblog:appConfig");
const mongoose = require("mongoose");

// Process termination
process.on("SIGTERM", function () {
    debug("Dropping database connection.");
    disconnectDatabase();
});

// Interrupt
process.on("SIGINT", function () {
    debug("Interrupt detected. Dropping database connection.");
    disconnectDatabase();
});

// Handle unhandled rejection through process
process.on("unhandledRejection", ex => {throw ex});


// Helper methods
function disconnectDatabase() {
    if (mongoose.connection.readyState !== 0) {
        debug("No connection established.");
        return process.exit(0);
    }

    mongoose.disconnect()
        .then(r => {
            debug("Dropped database connection.");
            process.exit(0);
        })
        .catch(e => {
            debug("Error:", e.message);
            process.exit(1);
        });
}
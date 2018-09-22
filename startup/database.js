const mongoose = require("mongoose");
const debug = require("debug")("gitblog:db");
const config = require("config");

mongoose.connect(config.get("dbHost"), {
    useNewUrlParser: true,
    dbName: config.get("dbName"),
    user: config.get("dbUser"),
    pass: config.get("dbPassword"),
    authSource: config.get("dbAuthSource") || config.get("dbName"),
    keepAlive: true,
    connectTimeoutMS: 10*1000,
    socketTimeoutMS: 45*1000,
    reconnectTries: Number.MAX_SAFE_INTEGER
})
.then(r => {
    debug("Connected to database.");
})
.catch(e => {
    debug("Unable to connect to database.");
    process.exit(1);
});

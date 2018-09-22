const config = require("config");
const debug = require("debug")("gitblog:config");

try {

    debug("jwtToken:", config.get("jwtPrivateKey"));
    debug("dbHost:", config.get("dbHost"));
    debug("dbName:", config.get("dbName"));
    debug("dbUser:", config.get("dbUser"));
    debug("dbPassword:", config.get("dbPassword"));
    debug("dbAuthSource:", config.get("dbAuthSource"));

} catch(e) {
    debug("Error:", e.message);
    process.exit(1);
}
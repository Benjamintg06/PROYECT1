const { FieldValue } = require("../config/firebase");

function setTimestamp(req, res, next) {
    req.body.timestamp = FieldValue.serverTimestamp();
    return next();
}

module.exports = { setTimestamp };

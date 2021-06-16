const { v4: uuidv4 } = require("uuid");

function generateUUID(req, res, next) {
    req.body.uid = uuidv4();
    return next();
}

module.exports = { generateUUID };

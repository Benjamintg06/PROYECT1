const { auth } = require("../config/firebase");

async function verifyToken(req, res, next) {
    const { token } = req.params;
    try {
        await auth.verifyIdToken(token);
        next();
    } catch (error) {
        next({ message: "Decoding Firebase ID token failed." });
    }
}

module.exports = { verifyToken };

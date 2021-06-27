const { auth } = require("../config/firebase");

async function verifyAdminToken(req, res, next) {
    const { token } = req.params;
    try {
        const verified = await auth.verifyIdToken(token);
        if (!verified.admin) next({ message: "Permission denied." });
        next();
    } catch (error) {
        next({ message: "Decoding Firebase ID token failed." });
    }
}

module.exports = { verifyAdminToken };

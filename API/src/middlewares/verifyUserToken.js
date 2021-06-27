const { auth } = require("../config/firebase");

async function verifyUserToken(req, res, next) {
    const { token, uid } = req.params;
    try {
        const { user_id, admin } = await auth.verifyIdToken(token);
        if (user_id !== uid && !admin) next({ message: "Permission denied." });
        next();
    } catch (error) {
        next({ message: "Decoding Firebase ID token failed." });
    }
}

module.exports = { verifyUserToken };

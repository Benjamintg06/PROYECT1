const { auth } = require("../config/firebase");

const addAdmin = async (req, res, next) => {
    try {
        const { uid, email, password, displayName, photoURL } = req.body;
        const userRecord = await auth.createUser({
            uid,
            email,
            password,
            displayName,
            photoURL,
            emailVerified: false,
            disabled: false,
        });
        await auth.setCustomUserClaims(uid, {
            admin: true,
        });
        return res.status(200).json(userRecord);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addAdmin,
};

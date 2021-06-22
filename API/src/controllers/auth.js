const { auth } = require("../config/firebase");

const addAdmin = async (req, res, next) => {
    try {
        const data = req.body;
        const userRecord = await auth.createUser({
            uid: data.uid,
            email: data.email,
            password: data.password,
            displayName: data.displayName,
            //photoURL: data.photoURL || "",
            emailVerified: false,
            disabled: false,
        });
        const configAdmin = await auth.setCustomUserClaims(data.uid, {
            admin: true,
        });
        return res.status(200).json(userRecord);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addAdmin,
};

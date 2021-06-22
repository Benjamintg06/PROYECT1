const { auth } = require("../config/firebase");

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const userRecord = await auth.createUser({
            email: data.email,
            password: data.password,
            displayName: data.displayName,
            //photoURL: data.photoURL || "",
            emailVerified: false,
            disabled: false,
        });
        return res.status(200).json(userRecord);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res, next) => {
    try {
        const userRecord = await auth.getUser(req.params.uid);
        return res.status(200).json(userRecord);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const paramsuid = req.params.uid;
        const { uid, ...data } = req.body;
        if (paramsuid !== uid) {
            return res.status(400).json({ message: "Operation denied" });
        }
        const userRecord = await auth.updateUser(uid, data);
        return res.status(200).json(userRecord);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const paramsuid = req.params.uid;
        const { uid } = req.body;
        if (paramsuid !== uid) {
            return res.status(400).json({ message: "Operation denied" });
        }
        await auth.deleteUser(uid);
        return res.status(200).json({ message: "Record deleted successfuly" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser,
};

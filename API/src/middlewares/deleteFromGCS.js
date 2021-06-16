const { bucket } = require("../config/firebase");

async function deleteFromGCS(req, res, next) {
    if (req.method !== "DELETE") {
        if (req.body.preserveLogo !== "false") {
            return next();
        }
    }

    try {
        const oldFile = bucket.file(req.params.uid);
        const exist = await oldFile.exists();
        if (exist[0]) {
            await oldFile.delete();
            req.body.photoURL = "";
        }
        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = { deleteFromGCS };

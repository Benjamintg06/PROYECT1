const fs = require("fs").promises;
const { bucket } = require("../config/firebase");

async function uploadFile(req, res, next) {
    try {
        const file = req.file;
        const uid = req.body.uid;

        const bucketFile = bucket.file(uid);

        const stream = bucketFile.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        stream.on("error", (err) => {
            file.cloudStorageError = err;
            next(err);
        });

        stream.on("finish", async () => {
            if (file.path) await fs.unlink(file.path);
            bucketFile.makePublic().then(() => {
                req.body.photoURL = bucketFile.publicUrl();
                next();
            });
        });

        if (file.path) stream.end(await fs.readFile(file.path));
        if (file.buffer) stream.end(file.buffer);
    } catch (error) {
        throw error;
    }
}

async function uploadToGCS(req, res, next) {
    if (!req.file) {
        return next();
    }

    try {
        await uploadFile(req, res, next);
    } catch (error) {
        return next(error);
    }
}

module.exports = { uploadToGCS };

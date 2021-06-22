const { Router } = require("express");
const router = Router();

const { addAdmin } = require("../controllers/auth");
const { generateUUID } = require("../middlewares/generateUUID");
const { setTimestamp } = require("../middlewares/setTimestamp");
const { uploadToGCS } = require("../middlewares/uploadToGCS");
const { multer } = require("../middlewares/multer");

router.post(
    "/auth/admin",
    multer().single("logo"),
    generateUUID,
    setTimestamp,
    uploadToGCS,
    addAdmin
);

module.exports = {
    auth: router,
};

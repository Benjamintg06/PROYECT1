const { Router } = require("express");
const router = Router();

const {
    addJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
} = require("../controllers/job");

const { generateUUID } = require("../middlewares/generateUUID");
const { setTimestamp } = require("../middlewares/setTimestamp");
const { uploadToGCS } = require("../middlewares/uploadToGCS");
const { deleteFromGCS } = require("../middlewares/deleteFromGCS");
const { multer } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyIdToken } = require("../middlewares/verifyIdToken");

router.post(
    "/jobs/:token",
    verifyToken,
    multer().single("logo"),
    generateUUID,
    setTimestamp,
    uploadToGCS,
    addJob
);

router.get("/jobs", getJobs);

router.get("/jobs/:uid", getJob);

router.put(
    "/jobs/:uid/:poster/:token",
    verifyIdToken,
    multer().single("logo"),
    deleteFromGCS,
    uploadToGCS,
    updateJob
);

router.delete(
    "/jobs/:uid/:poster/:token",
    verifyIdToken,
    deleteFromGCS,
    deleteJob
);

module.exports = {
    job: router,
};

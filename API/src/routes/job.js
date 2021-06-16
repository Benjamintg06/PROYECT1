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

router.post(
    "/jobs",
    multer().single("logo"),
    generateUUID,
    setTimestamp,
    uploadToGCS,
    addJob
);

router.get("/jobs", getJobs);

router.get("/jobs/:uid", getJob);

router.put(
    "/jobs/:uid",
    multer().single("logo"),
    deleteFromGCS,
    uploadToGCS,
    updateJob
);

router.delete("/jobs/:uid", deleteFromGCS, deleteJob);

module.exports = {
    job: router,
};

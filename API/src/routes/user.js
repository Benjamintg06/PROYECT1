const { Router } = require("express");
const router = Router();

const {
    addUser,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/user");

const { uploadToGCS } = require("../middlewares/uploadToGCS");
const { deleteFromGCS } = require("../middlewares/deleteFromGCS");
const { multer } = require("../middlewares/multer");

router.post("/user", multer().single("logo"), uploadToGCS, addUser);

router.get("/user/:uid", getUser);

router.put(
    "/user/:uid",
    multer().single("logo"),
    deleteFromGCS,
    uploadToGCS,
    updateUser
);

router.delete("/user/:uid", deleteUser);

module.exports = {
    user: router,
};

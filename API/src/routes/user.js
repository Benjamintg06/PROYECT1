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
const { verifyUserToken } = require("../middlewares/verifyUserToken");

router.post("/user", multer().single("logo"), uploadToGCS, addUser);

router.get("/user/:uid/:token", verifyUserToken, getUser);

router.put(
    "/user/:uid/:token",
    verifyUserToken,
    multer().single("logo"),
    deleteFromGCS,
    uploadToGCS,
    updateUser
);

router.delete("/user/:uid/:token", verifyUserToken, deleteUser);

module.exports = {
    user: router,
};

const { Router } = require("express");
const router = Router();

const {
    addCollection,
    getCollection,
    getCollections,
    updateCollection,
    deleteCollection,
} = require("../controllers/collection");
const { generateUUID } = require("../middlewares/generateUUID");
const { setTimestamp } = require("../middlewares/setTimestamp");
const { verifyToken } = require("../middlewares/verifyToken");

router.post(
    "/collection/:collection/:token",
    verifyToken,
    generateUUID,
    setTimestamp,
    addCollection
);
router.get("/collection/:collection", getCollections);
router.get("/collection/:collection/:uid", getCollection);
router.put(
    "/collection/:collection/:uid/:token",
    verifyToken,
    updateCollection
);
router.delete(
    "/collection/:collection/:uid/:token",
    verifyToken,
    deleteCollection
);

module.exports = {
    collections: router,
};

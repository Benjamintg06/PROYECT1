const { Router } = require("express");
const router = Router();

const { generateUUID } = require("../middlewares/generateUUID");
const { setTimestamp } = require("../middlewares/setTimestamp");
const {
    addCollection,
    getCollection,
    getCollections,
    updateCollection,
    deleteCollection,
} = require("../controllers/collection");

router.post(
    "/collection/:collection",
    generateUUID,
    setTimestamp,
    addCollection
);
router.get("/collection/:collection", getCollections);
router.get("/collection/:collection/:uid", getCollection);
router.put("/collection/:collection/:uid", updateCollection);
router.delete("/collection/:collection/:uid", deleteCollection);

module.exports = {
    collections: router,
};

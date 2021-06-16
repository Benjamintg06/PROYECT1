const { firestore, FieldValue } = require("../config/firebase");

const addCollection = async (req, res, next) => {
    try {
        const data = req.body;
        const collection = firestore.collection(req.params.collection);
        const newRecord = collection.doc(data.uid);
        Object.keys(data).forEach((key) => {
            if (data[key] === null || data[key] === undefined) data[key] = "";
        });
        await newRecord.create(data);
        const recordAdded = await collection.doc(newRecord.uid).get();
        return res.status(200).json(recordAdded.data());
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const getCollections = async (req, res, next) => {
    try {
        const collection = firestore.collection(req.params.collection);
        const data = await collection.get();
        if (!data.docs) {
            return res.status(404).json({ message: "No record found" });
        }
        const results = [];
        data.docs.forEach((doc) => results.push(doc.data()));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCollection = async (req, res, next) => {
    try {
        const collection = firestore.collection(req.params.collection);
        const uid = req.params.uid;
        const record = collection.doc(uid);
        const data = await record.get();
        if (!data.uid) {
            return res.status(404).json({ message: "No record found" });
        }
        return res.status(200).json([data.data()]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateCollection = async (req, res, next) => {
    try {
        const collection = firestore.collection(req.params.collection);
        const uid = req.params.uid;
        const record = collection.doc(uid);
        const data = req.body;
        Object.keys(data).forEach((key) => {
            if (data[key] === null || data[key] === undefined) delete data[key];
        });
        await record.update(data);
        const result = await record.get();
        return res.json(result.data());
    } catch (error) {
        return res.status(200).status(500).json({ message: error.message });
    }
};

const deleteCollection = async (req, res, next) => {
    try {
        const collection = firestore.collection(req.params.collection);
        const uid = req.params.uid;
        await collection.doc(uid).delete();
        return res.status(200).json({ message: "Record deleted successfuly" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addCollection,
    getCollection,
    getCollections,
    updateCollection,
    deleteCollection,
};

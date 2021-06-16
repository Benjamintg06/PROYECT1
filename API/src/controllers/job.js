const { firestore } = require("../config/firebase");

const collection = firestore.collection("jobs");

const addJob = async (req, res, next) => {
    try {
        const data = request.body;
        const jobToAdd = collection.doc(data.uid);
        Object.keys(data).forEach((key) => {
            if (data[key] === null || data[key] === undefined) data[key] = "";
        });
        await jobToAdd.create(data);
        const jobAdded = await jobToAdd.get();
        return res.status(200).json(jobAdded.data());
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const getJobs = async (req, res, next) => {
    try {
        const data = await collection.get();
        if (!data.docs) {
            return res.status(404).json({ message: "No Job record found" });
        }
        const jobsArray = [];
        data.docs.forEach((doc) => jobsArray.push(doc.data()));
        return res.status(200).json(jobsArray);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getJob = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const record = collection.doc(uid);
        const data = await record.get();
        if (!data.id) {
            return res.status(404).json({ message: "No Job record found" });
        }
        return res.status(200).json([data.data()]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateJob = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const data = request.body;
        const jobToUpdate = collection.doc(uid);
        Object.keys(data).forEach((key) => {
            if (data[key] === null || data[key] === undefined) delete data[key];
        });
        await jobToUpdate.update(data);
        const jobUpdated = await jobToUpdate.get();
        return res.status(200).json(jobUpdated.data());
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteJob = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        await collection.doc(uid).delete();
        return res.status(200).json({ message: "Record deleted successfuly" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
};

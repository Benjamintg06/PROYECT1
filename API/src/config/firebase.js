const admin = require("firebase-admin");
const { firebaseConfig } = require("./config");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    ...firebaseConfig,
});

const firestore = admin.firestore();
const auth = admin.auth();
const bucket = admin.storage().bucket();
const FieldValue = admin.firestore.FieldValue;

module.exports = {
    firestore,
    auth,
    bucket,
    FieldValue,
};

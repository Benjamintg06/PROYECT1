const WebSocket = require("ws");
const { firestore } = require("../config/firebase");

const dataState = (data, change) => {
    switch (change.type) {
        case "added":
            data.push(change);
            break;

        case "modified":
            const modifiedIndex = data.findIndex(
                (item) => item.document.uid === change.document.uid
            );
            data[modifiedIndex].document = change.document;
            break;

        case "removed":
            const deletedIndex = data.findIndex(
                (item) => item.document.uid === change.document.uid
            );
            data.splice(deletedIndex, 1);
            break;
        default:
            break;
    }
};

module.exports = (wss) => {
    let data = [];

    const query = firestore.collection("jobs").orderBy("timestamp", "asc");

    query.onSnapshot((querySnapshot) => {
        changes = querySnapshot.docChanges().map((docChange) => {
            change = {
                type: docChange.type,
                document: docChange.doc.data(),
            };
            dataState(data, change);
            return change;
        });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(changes));
            }
        });
    });

    wss.on("connection", (ws) => {
        ws.send(JSON.stringify(data));
    });
};

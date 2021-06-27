const WebSocket = require("ws");
const { firestore } = require("../config/firebase");

module.exports = (wss) => {
    let unsubscribe;
    wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", (data) => {
            const query = firestore
                .collection(data)
                .orderBy("timestamp", "asc");
            unsubscribe = query.onSnapshot(
                (querySnapshot) => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(
                            JSON.stringify(
                                querySnapshot.docChanges().map((change) => ({
                                    type: change.type,
                                    document: change.doc.data(),
                                }))
                            )
                        );
                    }
                },
                (err) => {
                    console.log(`Encountered error: ${err}`);
                }
            );
        });

        ws.on("close", () => {
            if (unsubscribe) unsubscribe();
            console.log("Client disconnected");
        });
    });

    wss.on("listening", () => console.log("WebSocket Server Is Listenning"));
};

const WebSocket = require("ws");
const { firestore } = require("../config/firebase");

module.exports = (wss) => {
    wss.on("connection", (ws) => {
        console.log("Client connected");

        const query = firestore.collection("jobs").orderBy("timestamp", "asc");
        const unsubscribe = query.onSnapshot(
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

        ws.on("close", () => {
            unsubscribe();
            console.log("Client disconnected");
        });
    });

    wss.on("listening", () => console.log("WebSocket Server Is Listenning"));
};

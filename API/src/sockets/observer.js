const WebSocket = require("ws");
const { firestore } = require("../config/firebase");

module.exports = (wss) => {
    let unsubscribe;
    wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", (data) => {
            const query = firestore.collection(data);
            unsubscribe = query.onSnapshot(
                (snapshot) => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(
                            JSON.stringify(
                                snapshot.docs.map((snap) => snap.data())
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
            console.log("Client disconnected", instances);
            if (unsubscribe) unsubscribe();
        });
    });

    wss.on("listening", () => console.log("WebSocket Server Is Listenning"));
};

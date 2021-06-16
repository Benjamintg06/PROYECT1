const app = require("./app");
const { port } = require("./config/config");

const server = require("http").Server(app);
const { Server } = require("ws");

const socket = require("./sockets/jobStreamer");
const wss = new Server({ server: server });
socket(wss);

server.listen(port, () =>
    console.log("Express Server is running in port", port)
);

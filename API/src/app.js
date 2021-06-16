const express = require("express");
const cors = require("cors");
const path = require("path");

const { collections } = require("./routes/collection");
const { job } = require("./routes/job");
const { user } = require("./routes/user");
const {
    multerErrorHandler,
} = require("./middlewares/errorHandlers/multerError");

const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// routes
app.use("/api/", collections);
app.use("/api/", job);
app.use("/api/", user);

// error handlers
app.use(multerErrorHandler);
app.use((err, req, res, next) => {
    return res.status(500).json({ message: err.message });
});

// static files
app.use(express.static(path.join(__dirname, "../public")));

module.exports = app;

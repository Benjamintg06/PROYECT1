const Multer = require("multer");

const multerErrorMessages = {
    LIMIT_PART_COUNT: "Too many parts",
    LIMIT_FILE_SIZE: "File too large. The maximum file size allowed is 5mb",
    LIMIT_FILE_COUNT: "Too many files",
    LIMIT_FIELD_KEY: "Field name too long",
    LIMIT_FIELD_VALUE: "Field value too long",
    LIMIT_FIELD_COUNT: "Too many fields",
    LIMIT_UNEXPECTED_FILE:
        "Unexpected file. Only .png, .jpg, .jpeg and .svg format allowed",
};

function multerErrorHandler(err, req, res, next) {
    if (err instanceof Multer.MulterError) {
        res.status(500).json({
            message: multerErrorMessages[err.code],
        });
    } else {
        next(err);
    }
}

module.exports = { multerErrorHandler };

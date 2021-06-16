const Multer = require("multer");

const engines = {
    MEMORY: "memory",
    DISK: "disk",
};

const disk = Multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/tmp");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        return cb(null, uniqueSuffix);
    },
});

const chooseEngine = (engine) => {
    if (engine == engines.MEMORY) return Multer.memoryStorage();
    if (engine == engines.DISK) return disk;
};

const multer = (storageEngine = engines.MEMORY) =>
    Multer({
        storage: chooseEngine(storageEngine),
        limits: {
            fileSize: 5 * 1024 * 1024, // no larger than 5mb
        },
        fileFilter(req, file, next) {
            const isImage = file.mimetype.startsWith("image/");

            if (isImage) {
                return next(null, true);
            } else {
                return next(
                    new Multer.MulterError("LIMIT_UNEXPECTED_FILE"),
                    false
                );
            }
        },
    });

module.exports = { multer, engines };

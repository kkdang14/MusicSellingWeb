const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/")
    },

    filename: function (req, file, cb) {
        const uniqueFilename = uuid.v4(); // Generate a unique identifier
        const fileExtension = path.extname(file.originalname);
        cb(null, `${uniqueFilename}${fileExtension}`);
    }
})

const limits = {
    fileSize: 1024 * 1024 * 2, // 2 MB
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter,
});

module.exports = upload
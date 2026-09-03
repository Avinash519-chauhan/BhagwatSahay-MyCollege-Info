const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName)
    },
});

const filefilter = (req,file,cb) => {
    let allowFiles = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

    if(allowFiles.includes(file.mimetype)) {
        cb(null, true);
    }else{
        cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"),false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits:{
        fileSize: 2 * 1024 * 1024,
    },
});

module.exports = upload;
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const multerUploader = (destination, allowedTypes = /jpg|jpeg|png|WebP|mkv/) => {

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination)
    }

    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, destination)
        },
        filename: function (re, file, cb) {
            const fileName = Date.now() + Math.floor(Math.random() * 9999999)
            const ext = path.extname(file.originalname)
            cb(null, `${fileName}${ext}`)
        }
    })


    const fileFilter = (req, file, cb) => {
        
        const type = file.mimetype

        if (allowedTypes.test(type)) {
            cb(null, true)
        } else {

            cb(new Error("Invalid file type. Only JPG, JPEG, PNG, MP4,MKV, and WebP are allowed"), false)
        }
    }


    const upload = multer({
        storage,
        fileFilter
    })

    return upload
}


module.exports = multerUploader
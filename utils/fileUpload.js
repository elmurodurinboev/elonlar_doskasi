const multer = require("multer")
const path = require("path")

// Set storage

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Initilaize multer
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png|vaw|gif|webp/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeName = fileTypes.test(file.mimetype)

  if (extname && mimeName) {
    return cb(null, true)
  } else {
    cb('Error: You can only upload image files')
  }
}

module.exports = upload
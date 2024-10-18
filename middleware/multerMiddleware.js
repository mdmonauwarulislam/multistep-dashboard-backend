const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Ensure this matches your directory structure
  },
  filename: (req, file, cb) => {
    // Set the file name to include a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept image files only
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: File upload only supports the following filetypes - ' + filetypes);
    }
  },
});

module.exports = upload;

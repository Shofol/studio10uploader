// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Set up storage engine
const storage = multer.diskStorage({
  destination: 'src/assets/files',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname  }-${  Date.now()  }${path.extname(file.originalname)}`);
  }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('file');


// Upload route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      if (req.file === undefined) {
        res.status(400).json({ msg: 'No file selected' });
      } else {
        res.status(200).json({
          msg: 'File uploaded successfully',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

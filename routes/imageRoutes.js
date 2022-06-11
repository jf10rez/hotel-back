//Routes of images

// Host + /api/image

const { Router } = require("express");
const router = Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

const { storeImage } = require("../controllers/imageController");

router.post("/", upload.array("images", 12), storeImage);

module.exports = router;

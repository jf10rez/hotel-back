//Routes of images

// Host + /api/image

const { Router } = require("express");
const router = Router();

const { storeImage } = require("../controllers/imageController");
const { upload } = require("../helpers/multer-validations");

router.post("/", upload.array("images", 12), storeImage);

module.exports = router;

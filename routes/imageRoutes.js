//Routes of images

// Host + /api/image

const { Router } = require("express");
const router = Router();

const { storeImage, imagesByRoom, updateImage, deleteImage } = require("../controllers/imageController");
const { upload } = require("../helpers/multer-validations");

router.post("/", upload.array("images", 12), storeImage);

router.get( '/:idRoom', imagesByRoom )

router.delete( '/:id', deleteImage )

// router.put( '/', upload.single('images') , updateImage )

module.exports = router;

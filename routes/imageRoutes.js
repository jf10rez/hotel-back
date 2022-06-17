//Routes of images

// Host + /api/image

const { Router } = require("express");
const router = Router();

const {
  imagesByRoom,
  deleteImage,
  uploadImageToCloud,
} = require("../controllers/imageController");
const { isObjectId } = require("../helpers/isObjectId");
const { upload } = require("../helpers/multer-validations");
const { check } = require("express-validator");

//Middlewares
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateObjectId } = require("../middlewares/validate-objectId");
const { validateFields } = require("../middlewares/validate-fields");

router.use(validateJWT);

// router.post(
//   "/",
//   [
//     upload.array("images", 12),
//     check("idRoom", "El idRoom no es valido").custom(isObjectId),
//     validateFields,
//   ],
//   storeImage
// );

router.post(
  "/",
  [
    upload.single("image"),
    check("idRoom", "El idRoom no es valido").custom(isObjectId),
    validateFields,
  ],
  uploadImageToCloud
);

router.get("/:idRoom", validateObjectId, imagesByRoom);

router.delete("/:id", deleteImage);

module.exports = router;

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/products");
const getImage = require("../../middlewares/getImage");
const upload = require("../../middlewares/upload");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/product");

router.get("/", ctrl.getAll);

// router.get('/', authenticate, ctrl.getAll)

router.get("/:productId", isValidId, ctrl.getById);

// router.get('/:contactId', authenticate, isValidId, ctrl.getById)

router.post(
  "/",
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "extraPhotos", maxCount: 3 },
  ]),
  validateBody(schemas.addSchema),
  getImage,
  ctrl.addProduct
);

// router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addProduct)

router.delete("/:productId", isValidId, ctrl.deleteProduct);

// router.delete('/:contactId', authenticate, isValidId, ctrl.deleteProduct)

router.put(
  "/:productId",
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateProduct
);

// router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateProduct)

// router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router;

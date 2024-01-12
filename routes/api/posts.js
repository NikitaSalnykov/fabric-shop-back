const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/posts");
const {
  validateBody,
} = require("../../middlewares");
const { schemas } = require("../../models/post");
const isValidPostId = require("../../middlewares/isValidPostId");
const getImage = require("../../middlewares/getImage");
const upload = require("../../middlewares/upload");

router.get("/", ctrl.getAll);
router.get("/count", ctrl.getPostCount);
router.get("/:postId", isValidPostId, ctrl.getById);
router.post("/",   upload.fields([
  { name: "mainPhoto", maxCount: 1 },
  { name: "extraPhotos", maxCount: 3 },
]), validateBody(schemas.addSchema), getImage, ctrl.addPost);
router.delete("/:postId", isValidPostId, ctrl.deletePost);
router.patch(
  "/:orderId",
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "extraPhotos", maxCount: 3 },
  ]),
  isValidPostId,
  validateBody(schemas.updateSchema),
  getImage,
  ctrl.updatePost
);

module.exports = router;

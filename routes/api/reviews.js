const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/reviews");
const {
  validateBody,
} = require("../../middlewares");
const { schemas } = require("../../models/post");
const getImage = require("../../middlewares/getImage");
const upload = require("../../middlewares/upload");
const isValidReviewId = require("../../middlewares/isValidReviewId");

router.get("/", ctrl.getAll);
router.get("/:reviewId", isValidReviewId, ctrl.getById);
router.post("/",   upload.fields([
  { name: "extraPhotos", maxCount: 3 },
]), validateBody(schemas.addSchema), getImage, ctrl.addPost);
router.delete("/:reviewId", isValidReviewId, ctrl.deletePost);

module.exports = router;

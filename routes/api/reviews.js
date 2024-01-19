const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/reviews");
const {
  validateBody,
} = require("../../middlewares");
const { schemas } = require("../../models/review");
const getImage = require("../../middlewares/getImage");
const upload = require("../../middlewares/upload");
const isValidReviewId = require("../../middlewares/isValidReviewId");

router.get("/", ctrl.getAll);
router.get("/:reviewId", isValidReviewId, ctrl.getById);
router.patch("/:reviewId/comments", isValidReviewId, ctrl.addComment);
router.delete("/:reviewId/comments/:commentId", isValidReviewId, ctrl.deleteComment);
router.post("/",   upload.fields([
  { name: "extraPhotos", maxCount: 3 },
]), validateBody(schemas.addSchema), getImage, ctrl.addReview);
router.delete("/:reviewId", isValidReviewId, ctrl.deleteReview);

module.exports = router;

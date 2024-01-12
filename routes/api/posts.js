const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/posts");
const {
  validateBody,
} = require("../../middlewares");
const { schemas } = require("../../models/post");
const isValidPostId = require("../../middlewares/isValidPostId");

router.get("/", ctrl.getAll);
router.get("/count", ctrl.getPostCount);
router.get("/:postId", isValidPostId, ctrl.getById);
router.post("/", validateBody(schemas.addSchema), ctrl.addPost);
router.delete("/:postId", isValidPostId, ctrl.deletePost);
router.put(
  "/:orderId",
  isValidPostId,
  validateBody(schemas.updateSchema),
  ctrl.updatePost
);

module.exports = router;

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/orders");
const {
  validateBody,
  isValidOrderId,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/order");

router.get("/", ctrl.getAll);
router.get("/count", ctrl.getCount);
router.get("/:orderId", isValidOrderId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addOrder);

router.delete("/:orderId", isValidOrderId, ctrl.deleteOrder);

router.put(
  "/:orderId",
  isValidOrderId,
  validateBody(schemas.addSchema),
  ctrl.updateOrder
);

module.exports = router;

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/orders");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/order");

router.get("/", ctrl.getAll);
router.get("/count", ctrl.getCount);
router.get("/:orderId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addOrder);

router.delete("/:orderId", isValidId, ctrl.deleteOrder);

router.put(
  "/:orderId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateOrder
);

module.exports = router;

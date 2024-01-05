const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidOrderId = (req, res, next) => {
  const { orderId } = req.params;
  if (!isValidObjectId(orderId)) {
    next(HttpError(400, `${orderId} is not valid id`));
  }
  next();
};

module.exports = isValidOrderId;

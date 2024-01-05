const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const resize = require("./resizeAvatar");
const isValidOrderId = require("./isValidOrderId");

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  resize,
  isValidOrderId,
};

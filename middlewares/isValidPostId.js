const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidPostId = (req, res, next) => {
  const { postId } = req.params;
  if (!isValidObjectId(postId)) {
    next(HttpError(400, `${postId} is not valid id`));
  }
  next();
};

module.exports = isValidPostId;

const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Post } = require("../models/post");

const getAll = async (req, res) => {
  let result;
  result = await Post.find();
  res.json(result);
};

const getPostCount = async (req, res) => {
  let result;
  result = await Post.countDocuments();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { postId } = req.params;
  const result = await Post.findById(postId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addPost = async (req, res, next) => {
  const result = await Post.create({ ...req.body });
  res.json({ message: "Add success" });
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  const result = await Post.findByIdAndDelete(postId);
  if (!result) throw HttpError(404, "Not found");
  res.json({ message: "Delete success" });
};

const updatePost = async (req, res, next) => {
  console.log(req.body);
  const { postId } = req.params;
  const result = await Post.findByIdAndUpdate(postId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const updateMain = async (req, res, next) => {
  const { postId } = req.params;
  await Post.updateMany({}, { main: false });
  const result = await Post.findByIdAndUpdate(postId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getPostCount: ctrlWrapper(getPostCount),
  getById: ctrlWrapper(getById),
  addPost: ctrlWrapper(addPost),
  deletePost: ctrlWrapper(deletePost),
  updatePost: ctrlWrapper(updatePost),
  updateMain: ctrlWrapper(updateMain),
};

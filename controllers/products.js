const { Product } = require("../models/product");
const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  let result;

  result = await Product.find();

  res.json(result);
};

const getById = async (req, res, next) => {
  const { productId } = req.params;
  const result = await Product.findById(productId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addProduct = async (req, res, next) => {
  const { body, file } = req;
  if (file?.path) {
    const { secure_url, public_id } = await fileController.upload(
      file.path,
      "images",
      notice.imageId
    );
    body.imageURL = secure_url;
    body.imageId = public_id ? path.parse(public_id).name : null;
  }
  const result = await Product.create({ ...req.body });

  res.status(201).json({ message: "Create product success" });
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndDelete(productId);
  if (!result) throw HttpError(404, "Not found");
  res.json({ message: "Delete success" });
};

const updateProduct = async (req, res, next) => {
  console.log(req.body);
  const { productId } = req.params;
  const result = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Product.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addProduct: ctrlWrapper(addProduct),
  deleteProduct: ctrlWrapper(deleteProduct),
  updateProduct: ctrlWrapper(updateProduct),
  updateFavorite: ctrlWrapper(updateFavorite),
};

const {Product} = require('../models/product')
const {HttpError} = require('../helpers')
const ctrlWrapper = require('../helpers/ctrlWrapper')


const getAll = async (req, res) => {
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  let result;

  result = await Product.find()
  
  res.json(result);
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
    const result = await Product.findById(contactId)
    if (!result) throw HttpError(404, "Not found")
    res.json(result)
}

const addProduct = async (req, res, next) => {
    // const {_id: owner} = req.user
    // const result = await Product.create({...req.body, owner})
    const result = await Product.create({...req.body })

    res.status(201).json({message: "Create contact success"})
}

const deleteContact = async (req, res, next) => {
      const { productId } = req.params
      const result = await Product.findByIdAndDelete(productId)
      if (!result) throw HttpError(404, "Not found")
      res.json({message: "Delete success"})
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Product.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) throw HttpError(404, "Not found")
    res.json(result)
}

const updateFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Product.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) throw HttpError(404, "Not found")
    res.json(result)
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addProduct: ctrlWrapper(addProduct),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite)
}
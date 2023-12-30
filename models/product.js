const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMangooseErr } = require("../helpers");

const productSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, "Set name for product"],
    },
    category: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    article: {
      type: String,
    },
    mainPhoto: {
      type: String,
    },
    extraPhotos: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

productSchema.post("save", handleMangooseErr);

const addSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  color: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string(),
  article: Joi.string(),
  mainPhoto: Joi.string(),
  extraPhotos: Joi.array().items(Joi.string()),
});

const updateSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string(),
  color: Joi.string(),
  price: Joi.string(),
  description: Joi.string(),
  article: Joi.string(),
  mainPhoto: Joi.string(),
  extraPhotos: Joi.array().items(Joi.string()),
});

const schemas = {
  addSchema,
  updateSchema,
};

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
};

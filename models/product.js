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
  name: Joi.string(),
  category: Joi.string(),
  color: Joi.string(),
  price: Joi.string(),
  description: Joi.string(),
  article: Joi.string(),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required()
// })

const schemas = {
  addSchema,
};

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
};

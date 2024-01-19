const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMangooseErr } = require("../helpers");


const commentSchema = new Schema({
  author: {
    type: String,
    required: [true, "author is required"],
    minlength: 2,
  },
  comment: {
    type: String,
    required: [true, "comment is required"],
    minlength: 5,
    maxlength: 450,
  },
});

const reviewSchema = new Schema(
  {
    author: {
      type: String,
      required: [true, "author is required"],
      minlength: 2,
    },
    text: {
      type: String,
      required: [true, "review is required"],
      minlength: 40,
      maxlength: 450,
    },
    rating: {
      type: Number,
      required: [true, "rating is required"],
    },
    authorId: {
      type: String,
    },
    productId: {
      type: String,
      required: [true, "productId is required"],
    },
    comments: [commentSchema],
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

reviewSchema.post("save", handleMangooseErr);

const addSchema = Joi.object({
  text: Joi.string().min(40).max(450).required("add text"),
  author: Joi.string().required("add author"),
  rating: Joi.number().required("add rating"),
  authorId: Joi.string(),
  productId: Joi.string().required("add productId"),
});

const addSchemaComment = Joi.object({
  author: Joi.string().min(2).required(),
  comment: Joi.string().min(5).max(450).required(),
});

const schemas = {
  addSchema,
  addSchemaComment
};

const Review = model("review", reviewSchema);

module.exports = {
  Review,
  schemas,
};

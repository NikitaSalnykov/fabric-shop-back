const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMangooseErr } = require("../helpers");

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
    postId: {
      type: String,
      required: [true, "postId is required"],
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

reviewSchema.post("save", handleMangooseErr);

const addSchema = Joi.object({
  text: Joi.string().min(40).max(450).required("add text"),
  author: Joi.string().required("add author"),
  rating: Joi.number().required("add rating"),
  authorId: Joi.string(),
  postId: Joi.string().required("add postId"),

});

const schemas = {
  addSchema,
};

const Review = model("review", reviewSchema);

module.exports = {
  Review,
  schemas,
};

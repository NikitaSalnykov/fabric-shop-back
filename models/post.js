const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMangooseErr } = require("../helpers");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: 2,
    },
    description: {
      type: String,
      minlength: 2,
    },
    text: {
      type: String,
      required: [true, "text is required"],
      minlength: 40,
    },
    photo: {
      type: String,
    },
    author: {
      type: String,
      required: [true, "author is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

postSchema.post("save", handleMangooseErr);

const addSchema = Joi.object({
  title: Joi.string().min(2).required("add title"),
  text: Joi.string().min(40).required("add text"),
  author: Joi.string().required("add author"),
  description: Joi.string(),
});

const updateSchema = Joi.object({
  title: Joi.string().min(2),
  text: Joi.string().min(40),
  description: Joi.string(),
});

const schemas = {
  addSchema,
  updateSchema
};

const Post = model("post", postSchema);

module.exports = {
  Post,
  schemas,
};

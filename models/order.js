const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMangooseErr } = require("../helpers");

const orderSchema = new Schema(
  {
    order: {
      type: Object,
      required: [true, "add order object"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

orderSchema.post("save", handleMangooseErr);

const addSchema = Joi.object({
  order: Joi.object().required("add order object"),
});

const schemas = {
  addSchema,
};

const Order = model("order", orderSchema);

module.exports = {
  Order,
  schemas,
};

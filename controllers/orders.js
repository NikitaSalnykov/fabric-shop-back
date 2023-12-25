const { Order } = require("../models/order");
const { HttpError, sendEmail } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  let result;
  result = await Order.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { orderId } = req.params;
  const result = await Order.findById(orderId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addOrder = async (req, res, next) => {
  const result = await Order.create({ ...req.body });
  const { order } = req.body;

  function objectToString(obj) {
    let result = "";

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (typeof value !== "object") {
          result += `${key}: ${value}\n`;
        }
      }
    }

    return result;
  }

  const orderEmail = {
    to: "salnikov.nkt@gmail.com",
    subject: "Новый заказ",
    html: `<div>
    <h2>На вашем сайте новый заказ!</h2>
    <p>Только что был оформлен новый заказ, информация о заказе:<p>
    <p>${objectToString(order)}</p>
    </div>`,
  };

  await sendEmail(orderEmail);

  res.json({ message: "Add success" });
};

const deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const result = await Order.findByIdAndDelete(orderId);
  if (!result) throw HttpError(404, "Not found");
  res.json({ message: "Delete success" });
};

const updateOrder = async (req, res, next) => {
  console.log(req.body);
  const { orderId } = req.params;
  const result = await Order.findByIdAndUpdate(orderId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Order.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addOrder: ctrlWrapper(addOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
  updateOrder: ctrlWrapper(updateOrder),
  updateFavorite: ctrlWrapper(updateFavorite),
};
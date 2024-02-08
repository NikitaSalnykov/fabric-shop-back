const { Order } = require("../models/order");
const { HttpError, sendEmail } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const sendNotification = require("../helpers/telegramBot");


const getAll = async (req, res) => {
  let result;
  result = await Order.find();
  res.json(result);
};

const getCount = async (req, res) => {
  let result;
  result = await Order.countDocuments();
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

  // function objectToString(obj) {
  //   let result = "";

  //   for (const key in obj) {
  //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
  //       const value = obj[key];
  //       if (typeof value !== "object") {
  //         result += `${key}: ${value}\n`;
  //       }
  //     }
  //   }

  //   return result;
  // }

  const orderEmail = {
    to: "salnikov.nkt@gmail.com",
    subject: "Новый заказ",
    html: `<div>
    <h2>На вашем сайте новый заказ!</h2>
    <p>Только что был оформлен новый заказ, информация о заказе:</p>
    <h3>Номер заказа: ${order.orderNumber}</h3>
    <p>Имя заказчика: ${order.name} ${order.surname}</p>
    <p>Тел. ${order.tel}</p>
    <p>Способ доставки: ${
      order.delivery !== "" ? order.delivery : "Не указан"
    }</p>
    <p>Информация о заказе: ${order.info}</p>
    <p>Общая сумма заказа: ${order.total}</p>
    </div>`,
  };

  await sendNotification(order)
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

module.exports = {
  getAll: ctrlWrapper(getAll),
  getCount: ctrlWrapper(getCount),
  getById: ctrlWrapper(getById),
  addOrder: ctrlWrapper(addOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
  updateOrder: ctrlWrapper(updateOrder),
};

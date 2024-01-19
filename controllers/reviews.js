const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Review } = require("../models/review");

const getAll = async (req, res) => {
  let result;
  result = await Review.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { reviewId } = req.params;
  const result = await Review.findById(reviewId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addReview = async (req, res, next) => {
  const result = await Review.create({ ...req.body });
  res.json({ message: "Add success" });
};

const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const result = await Review.findByIdAndDelete(reviewId);
  if (!result) throw HttpError(404, "Not found");
  res.json({ message: "Delete success" });
};

const addComment = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { author, comment } = req.body;

    // Находим отзыв по ID
    const review = await Review.findById(reviewId);
    if (!review) {
      throw HttpError(404, "Отзыв не найден");
    }

    // Добавляем комментарий в массив комментариев отзыва
    review.comments.push({ author, comment });

    // Сохраняем обновленный отзыв
    await review.save();

    res.json({ message: "Комментарий успешно добавлен" });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { reviewId, commentId } = req.params;

    // Находим отзыв по ID
    const review = await Review.findById(reviewId);
    if (!review) {
      throw HttpError(404, "Отзыв не найден");
    }

    // Находим комментарий в массиве комментариев по ID
    const commentIndex = review.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      throw HttpError(404, "Комментарий не найден");
    }

    // Удаляем комментарий из массива комментариев
    review.comments.splice(commentIndex, 1);

    // Сохраняем обновленный отзыв
    await review.save();

    res.json({ message: "Комментарий успешно удален" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addReview: ctrlWrapper(addReview),
  deleteReview: ctrlWrapper(deleteReview),
  addComment: ctrlWrapper(addComment),
  deleteComment: ctrlWrapper(deleteComment),
};

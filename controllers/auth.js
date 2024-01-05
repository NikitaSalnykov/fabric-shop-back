const { User } = require("../models/user");
const { HttpError, sendEmail } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { nanoid } = require("nanoid");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const verifyEmail = {
    to: email,
    html: `<div>
    <h2>Здравствуйте, ${email}</h2>
    <p>Ваш аккаунт успешно создан для завершения регистрации нажмите кнопку:<p>
    <p><a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Завершить регистрацию</a></p>
    <p>Спасибо!</p>
    </div>`,
  };

  await sendEmail(verifyEmail);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      role: newUser.r,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  const userEmail = user.email;

  res.redirect(
    `http://localhost:5173/react-fabric-shop/verification?fromRegistration=true&email=${userEmail}`
  );
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Missing required field email");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    html: `<div>
    <h2>Hello, ${email}</h2>
    <p>To complete your verification process, please click on the link below:<p>
    <p><a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify</a></p>
    <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
    <p>Thank you!</p>
    </div>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not a verified");
  }

  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email, password },
  });
};

const current = async (req, res) => {
  const { email, role } = req.user;
  const user = await User.findOne({ email });
  res.json({
    email,
    role,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(201).json({
    message: "Logout success",
  });
};

const updateRole = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.json(result);
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateRole: ctrlWrapper(updateRole),
};

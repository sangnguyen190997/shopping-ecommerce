"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

const comparePassword = async (password, passwordHashed) => {
  const isMatch = bcrypt.compare(password, passwordHashed);
  return isMatch;
};

const genToken = async (data) => {
  const verify = jwt.sign(data, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "3d",
  });
  return verify;
};

const verifyToken = async (token) => {
  const verify = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  return verify;
};

const genrefreshToken = (data) => {
  const verify = jwt.sign(data, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "3d",
  });
  return verify;
};

module.exports = {
  hashPassword,
  comparePassword,
  genToken,
  verifyToken,
  genrefreshToken,
};

const { History, User } = require("../../models");

const gethistory = async (idUser) => {
  try {
    const historyUser = await History.findAll({
      where: {
        idUser,
      },
    });
    return historyUser;
  } catch (err) {
    console.log(err);
  }
};

const createHistory = async (data) => {
  try {
    const newHistory = await History.create(data);
    return newHistory;
  } catch (err) {
    console.log(err);
  }
};

const getListHistory = async () => {
  try {
    const listHistory = await History.findAll();
    return listHistory;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  gethistory,
  createHistory,
  getListHistory,
};

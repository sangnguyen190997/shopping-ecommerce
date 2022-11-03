const { Messenger } = require("../../models");
const { Op } = require("sequelize");

const getMessById = async (senderId, receiverId) => {
  try {
    const messenger = await Messenger.findAll({
      where: {
        [Op.and]: [{ senderId }, { receiverId }],
      },
    });
    return messenger;
  } catch (err) {
    console.log(err);
  }
};

const createMess = async (data) => {
  try {
    const newMess = await Messenger.create(data);
    return newMess;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getMessById,
  createMess,
};

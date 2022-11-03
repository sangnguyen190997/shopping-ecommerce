const { Converstation } = require("../../models");

const createConverstation = async (data) => {
  try {
    const newConverstation = await Converstation.create(data);
    return newConverstation;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createConverstation,
};

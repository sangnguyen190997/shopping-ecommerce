const { Cart, User } = require("../../models");

const getCartByUser = async (idUser) => {
  try {
    const cartUser = await Cart.findAll({
      where: {
        idUser,
      },
    });
    return cartUser;
  } catch (err) {
    console.log(err);
  }
};

const addToCart = async (product) => {
  try {
    const carts = await Cart.create(product);
    return carts;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCartByUser,
  addToCart,
};

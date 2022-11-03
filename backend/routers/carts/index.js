const { addToCart } = require("../../services/carts");

const express = require("express");
const { getProductById } = require("../../services/products");
const { authenticate } = require("../../middwares/auth");

const cartRouter = express.Router();

cartRouter.post("/", [authenticate], async (req, res) => {
  const { idProduct, productCount } = req.query;

  const user = req.user;
  const product = await getProductById(idProduct);

  const cart = await addToCart({
    idUser: user.id,
    idProduct: idProduct,
    nameProduct: product.name,
    priceProduct: product.price,
    count: productCount,
    img: product.img1,
  });

  if (!cart) {
    res.status(500).send("Can't create cart");
  }

  res.status(200).send(cart);
});

module.exports = cartRouter;

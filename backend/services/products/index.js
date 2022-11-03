const { Product } = require("../../models");
const { Op } = require("sequelize");

const addProduct = async (data) => {
  try {
    const newProduct = await Product.create(data);
    return newProduct;
  } catch (err) {
    console.log(err);
  }
};

const getListProduct = async () => {
  try {
    const listProduct = await Product.findAll();
    return listProduct;
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    return product;
  } catch (err) {
    console.log(err);
  }
};

const getProductByCategory = async (category) => {
  try {
    const product = await Product.findAll({
      where: {
        category,
      },
    });
    return product;
  } catch (err) {
    console.log(err);
  }
};

const panigationProduct = async (size, page) => {
  try {
    const product = await Product.findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
    });
    return product;
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (id) => {
  try {
    const productId = await Product.destroy({
      where: {
        id,
      },
    });
    return productId;
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (id, data) => {
  try {
    const product = await Product.update(data, {
      where: {
        id,
      },
    });
    return product;
  } catch (err) {
    console.log(err);
  }
};

const searchProduct = async (search) => {
  try {
    const product = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%search%",
            },
          },
          {
            price: {
              [Op.like]: "%search%",
            },
          },
          {
            category: {
              [Op.like]: "%search",
            },
          },
        ],
      },
    });
    return product;
  } catch (err) {}
};

module.exports = {
  addProduct,
  getProductById,
  getProductByCategory,
  getListProduct,
  panigationProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
};

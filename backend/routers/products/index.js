const express = require("express");
const {
  addProduct,
  getListProduct,
  getProductById,
  panigationProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
} = require("../../services/products");
const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
  const {
    name,
    description,
    price,
    img1,
    img2,
    img3,
    img4,
    category,
    originalPrice,
    promotionPercent,
  } = req.body;

  const newProduct = await addProduct({
    name,
    description,
    price,
    img1,
    img2,
    img3,
    img4,
    category,
    originalPrice,
    promotionPercent,
  });

  if (!newProduct) {
    return res.status(500).send("Can't add product");
  }

  res.status(200).send(newProduct);
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await getProductById(id);

  if (!product) {
    return res.status(500).send(`Can't get product id: ${id}`);
  }

  res.status(200).send(product);
});

productRouter.get("/", async (req, res) => {
  const page = Number.parseInt(req.query.page);
  const size = Number.parseInt(req.query.size);
  const keyWordSearch = req.query.search || "";
  const category = req.query.category || "";
  let products;

  if (page && size) {
    let start = (page - 1) * size;
    let end = page * size;

    if (category === "all") {
      products = await getListProduct();
    } else {
      products = await getProductByCategory(category);
    }

    let panigationProducts = products.slice(start, end);

    if (!keyWordSearch) {
      res.status(200).send(panigationProducts);
    } else {
      let newProduct = panigationProducts.filter((value) => {
        return (
          value.name.toLowerCase().indexOf(keyWordSearch.toLowerCase()) !== -1
        );
      });
      res.status(200).send(newProduct);
    }
  } else if (category || keyWordSearch) {
    if (category === "all") {
      products = await getListProduct();
    } else {
      products = await getProductByCategory(category);
    }
    res.status(200).send(products);
  } else {
    const products = await getListProduct();
    if (!products) {
      return res.status(500).send("Can't get panigation page");
    }
    res.status(200).send(products);
  }
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    img1,
    img2,
    img3,
    img4,
    category,
    originalPrice,
    promotionPercent,
  } = req.body;

  const isProductExist = getProductById(id);

  if (!isProductExist) {
    return res.status(500).send(`Product ${id} is not exists in db`);
  }

  const data = {
    name,
    description,
    price,
    img1,
    img2,
    img3,
    img4,
    category,
    originalPrice,
    promotionPercent,
  };

  await updateProduct(id, data);

  res.status(200).send(data);
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const isProductExist = getProductById(id);

  if (!isProductExist) {
    return res.status(500).send(`Product ${id} is not exists in db `);
  }

  const productDeleted = await deleteProduct(id);

  res.status(200).send(`User id : ${productDeleted} successfully`);
});

module.exports = productRouter;

const express = require("express");
const { authenticate } = require("../../middwares/auth");
const {
  createComment,
  getCommentByProduct,
} = require("../../services/comments");

const commentRouter = express.Router();

commentRouter.get("/", async (req, res) => {
  const { idProduct } = req.query;

  const comment = await getCommentByProduct(idProduct);

  if (!comment) {
    res.status(500).send("Can't get comment by id product");
  }
  res.status(200).send(comment);
});
commentRouter.post("/", [authenticate], async (req, res) => {
  const { id, comment, star } = req.body;
  const user = req.user;

  let arrayStar = [];

  for (let i = 0; i < star; i++) {
    arrayStar.push("fas fa-star text-warning");
  }

  let star1 = "";
  let star2 = "";
  let star3 = "";
  let star4 = "";
  let star5 = "";

  for (let i = 0; i < arrayStar.length; i++) {
    if (i === 0) {
      star1 = arrayStar[i];
    }
    if (i === 1) {
      star2 = arrayStar[i];
    }
    if (i === 2) {
      star3 = arrayStar[i];
    }
    if (i === 3) {
      star4 = arrayStar[i];
    }
    if (i === 4) {
      star5 = arrayStar[i];
    }
  }

  const data = {
    idProduct: id,
    idUser: user.id,
    fullname: user.fullname,
    content: comment,
    star1: star1,
    star2: star2,
    star3: star3,
    star4: star4,
    star5: star5,
  };

  const commentProduct = await createComment(data);

  res.status(200).send(commentProduct);
});

module.exports = commentRouter;

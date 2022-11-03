const { Comment } = require("../../models");

const getCommentByProduct = async (idProduct) => {
  try {
    const comment = await Comment.findAll({
      where: {
        idProduct,
      },
    });
    return comment;
  } catch (err) {
    console.log(err);
  }
};

const createComment = async (data) => {
  try {
    const comment = await Comment.create(data);
    return comment;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCommentByProduct,
  createComment,
};

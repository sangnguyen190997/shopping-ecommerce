const express = require("express");
const {
  gethistory,
  createHistory,
  getListHistory,
} = require("../../services/history");
const historyRouter = express.Router();

historyRouter.get("/", async (req, res) => {
  const { idUser } = req.query;

  if (idUser) {
    const user = await gethistory(idUser);
    if (!user) {
      return res.status(500).send("Can't get user history");
    }
    res.status(200).send(user);
  } else {
    const listHistory = await getListHistory();
    if (!listHistory) {
      return res.status(500).send("Can't get list history");
    }

    res.status(200).send(listHistory);
  }
});

historyRouter.post("/", async (req, res) => {
  const { idUser, phone, address, cart, fullname, total } = req.body;

  const history = await createHistory({
    idUser,
    phone,
    address,
    cart,
    fullname,
    total,
  });

  if (!history) {
    return res.status(500).send("Can't create history");
  }

  res.status(200).send(history);
});

// historyRouter.get("/", async (req, res) => {
//   const listHistory = await getListHistory();

//   if (!listHistory) {
//     return res.status(500).send("Can't get list history");
//   }

//   res.status(200).send(listHistory);
// });
module.exports = historyRouter;

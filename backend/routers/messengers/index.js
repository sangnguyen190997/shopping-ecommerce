const express = require("express");
const { getMessById, createMess } = require("../../services/messenger");

const messengerRouter = express.Router();

messengerRouter.get("/", async (req, res) => {
  const { senderId, receiverId } = req.query;

  const messenger = await getMessById(senderId, receiverId);

  if (!messenger) {
    return res.status(500).send("Can't get messenger");
  }

  res.status(200).send(messenger);
});

messengerRouter.post("/", async (req, res) => {
  const { senderId, receiverId, content, category } = req.body;

  const data = { senderId, receiverId, content, category };

  const messenger = await createMess(data);

  if (!messenger) {
    return res.status(500).send("Can't create messenger");
  }

  res.status(200).send(messenger);
});

messengerRouter.post("/converstation", (req, res) => {});

module.exports = messengerRouter;

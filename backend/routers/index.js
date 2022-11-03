const express = require("express");
const userRouter = require("./users");
const productRouter = require("./products");
const cartRouter = require("./carts");
const emailRouter = require("./emails");
const commentRouter = require("./comments");
const messengerRouter = require("./messengers");
const historyRouter = require("./history");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/carts", cartRouter);
rootRouter.use("/emails", emailRouter);
rootRouter.use("/comments", commentRouter);
rootRouter.use("/messengers", messengerRouter);
rootRouter.use("/history", historyRouter);

module.exports = rootRouter;

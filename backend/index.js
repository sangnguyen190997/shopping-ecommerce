const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const rootRouter = require("./routers");
const cookieParser = require("cookie-parser");
const path = require("path");
const { createMess } = require("./services/messenger");
const app = express();
const httpServer = require("http").createServer(app);

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const publicPathDirectory = path.join(__dirname, "public");
app.use(express.static(publicPathDirectory));

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", rootRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to the database", err);
  });

// (async () => {
//   await sequelize.sync();
// })();

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    const dataNew = {
      senderId: data.receiverId,
      receiverId: data.senderId,
      content: data.content,
      category: "receiver",
    };

    createMess(dataNew);
    socket.broadcast.emit("receive_message");
  });

  socket.on("send_order", (data) => {
    //Xử lý xong server gửi ngược lại client admin thông qua socket với key receive_order
    socket.broadcast.emit("receive_order", data);
  });
});

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});

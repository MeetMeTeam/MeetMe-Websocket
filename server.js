const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const socketServer = require("./socketServer");
const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

// register the routes.
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

app.get("/", (req, res) => {
  res.send("Running leaw");
});

const server = http.createServer(app);
socketServer.registerSocketServer(server);

console.log("start server");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. server not start");
    console.log(err);
  });

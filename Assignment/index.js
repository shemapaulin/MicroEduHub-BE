import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import AssignmentRoutes from "./src/Routes/assi_Routes.js";

dotenv.config();

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

const port = process.env.PORT;

app.use(express.json());

app.use("/api", AssignmentRoutes);

httpServer.listen(port, () => {
  console.log(`listening on server${port}-Assignment`);
});

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to the database!"))
  .catch((error) => {
    console.log("Connecting to the database has failed", error);
  });

  export default io;
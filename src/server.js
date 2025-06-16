import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import socketHandler from "./config/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  }
});

app.use(cors());
app.use(express.json());
app.use("/", routes);

socketHandler(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Socket Server running on port ${PORT}`));

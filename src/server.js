import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import socketHandler from "./config/socket.js";

dotenv.config();

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500'];

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use("/", routes);

socketHandler(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Socket Server running on port ${PORT}`));

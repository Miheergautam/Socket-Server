import express from "express";
import { createMessage, getMessagesBetweenUsers } from "../controllers/messageController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Socket Server is Running ✅");
});

router.post("/messages", createMessage);
router.get("/messages/:userAId/:userBId", getMessagesBetweenUsers);

export default router;

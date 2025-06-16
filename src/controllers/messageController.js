import prisma from "../config/prismaClient.js";

export const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    const message = await prisma.message.create({
      data: { senderId, receiverId, content }
    });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessagesBetweenUsers = async (req, res) => {
  const { userAId, userBId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userAId, receiverId: userBId },
          { senderId: userBId, receiverId: userAId }
        ]
      },
      orderBy: { createdAt: "asc" }
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

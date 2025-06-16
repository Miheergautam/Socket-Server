const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`New socket connected: ${socket.id}`);

    // Client should emit 'join' with their userId right after connecting
    socket.on('join', (userId) => {
      socket.join(userId);  // User joins a room named after their userId
      console.log(`Socket ${socket.id} joined room ${userId}`);
    });

    socket.on('send-message', (data) => {
      const { receiverId, message, senderId } = data;
      console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
      
      io.to(receiverId).emit('receive-message', {
        senderId,
        message,
      });
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export default socketHandler;

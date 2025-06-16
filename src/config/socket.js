const socketHandler = (io) => {
    io.on('connection', (socket) => {
      console.log(`New socket connected: ${socket.id}`);
  
      socket.on('send-message', (data) => {
        io.to(data.receiverId).emit('receive-message', data);
      });
  
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  };
  
  export default socketHandler;
  
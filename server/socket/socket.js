import SocketIO from 'socket.io';

const SoketServer = (server) => {
    const io = SocketIO(server, {
        path: '/socket.io',
        cors: {
            origin: '*',
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('유저입장');

        socket.on('joinRoom', (roomId, username) => {
            console.log(roomId);
            console.log(`${username}님 접속`);
            socket.join(roomId);

            socket.broadcast.to(roomId).emit('user-connected', {
                username: username,
                roomId: roomId,
                socketId: socket.id,
            });

            socket.on('disconnect', () => {
                socket.broadcast.to(roomId).emit('user-disconnected', username);
                socket.leave(roomId);
            });

            socket.on('roomchat', (message) => {
                socket.broadcast.to(roomId).emit('user-roomchat', {
                    username: message.username,
                    message: message.message,
                });
            });
        });

        //채팅
        socket.on('chat', (message) => {
            io.to(message.targetSocketId).emit('user-chat', {
                from: message.userName,
                message: message.message,
            });
        });
    });
};
export default SoketServer;

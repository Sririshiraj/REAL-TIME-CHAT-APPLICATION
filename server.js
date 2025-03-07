const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (optional: for production)
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for incoming messages and broadcast them to all other clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    
    socket.on('disconnect', () => {
        
    });
});
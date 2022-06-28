const express = require('express');
const { Server: IOserver} = require('socket.io');
const path = require('path');
//const { Socket } = require('dgram');
const app = express();
const port = 8080;
const messagesArray = [];
const expressServer = app.listen(port, (error) => {
    if (error)
        console.log(`Error: ${error}`);
    else
        console.log(`Servidor escuchando el puerto ${port}`)
});
const io = new IOserver(expressServer);

app.use(express.static(path.join(__dirname, "../public")));

io.on('connection', socket => {
    console.log(`Se conectó un usuario: ${socket.id}`); 

    socket.on('client:message', messageInfo => {
        messagesArray.push(messageInfo);

        io.emit('server:messages', messagesArray);
    });
})
const socket = io();

const messageForm = document.querySelector("#messageForm");
const usernameInput = document.querySelector("#usernameInput");
const messageInput = document.querySelector("#messageInput");
const messagesPool = document.querySelector("#messagesPool");

const sendMessage = (messageInfo) => {
    socket.emit('client:message', messageInfo);
}

const renderMessages = (messagesInfo) => {
    
    const html = messagesInfo.map(msgInfo => {
        return (
            `<div>
            <strong>${msgInfo.username}</strong>:
            <em>${msgInfo.message}</em>
            </div>`
        )
        
    }).join(" ");
    messagesPool.innerHTML = html;
}

messageForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const messageInfo = {username: usernameInput.value, message: messageInput.value};

    sendMessage(messageInfo);
});

socket.on('server:messages', renderMessages);
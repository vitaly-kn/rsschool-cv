appParams = {
  server: "http://localhost:3000",
  idUsername: "username",
  idChangeUsername: "change-username",
  idStatus: "status",
  idMessages: "messages",
  idNewMessage: "new-message",
  idSendMessage: "send-message",
};

const socket = io.connect(appParams.server);
const message = document.getElementById(appParams.idNewMessage);
const username = document.getElementById(appParams.idUsername);
const changeUsernameButton = document.getElementById(appParams.idChangeUsername);
const sendMessageButton = document.getElementById(appParams.idSendMessage);
const status = document.getElementById(appParams.idStatus);
const messages = document.getElementById(appParams.idMessages);

message.addEventListener("keypress", onNewMessageKeypress);
changeUsernameButton.addEventListener("click", onChangeUsernameClick);
sendMessageButton.addEventListener("click", onSendMessageButtonClick);

function onNewMessageKeypress() {
  socket.emit("typing");
}

socket.on("add_mess", (data) => {
  status.textContent = "";
  message.value = "";
  messages.insertAdjacentHTML("beforeend", `<div><b>${data.username}</b>: ${data.message}</div>`);
});

socket.on("typing", (data) => {
  status.textContent = `${data.username} is typing...`;
});

function onChangeUsernameClick() {
  socket.emit("change_username", { username: username.value });
}

function onSendMessageButtonClick() {
  socket.emit("new_message", {
    message: message.value,
  });
}

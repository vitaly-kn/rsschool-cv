appParams = {
  server: "http://localhost:3000",
  idUsername: "username",
  idUserColor: "user-color",
  idChangeUsername: "change-username",
  idStatus: "status",
  idMessages: "messages",
  idNewMessage: "new-message",
  idSendMessage: "send-message",
};

const socket = io.connect(appParams.server);
const message = document.getElementById(appParams.idNewMessage);
const username = document.getElementById(appParams.idUsername);
const setUserColorButton = document.getElementById(appParams.idUserColor);
const changeUsernameButton = document.getElementById(appParams.idChangeUsername);
const sendMessageButton = document.getElementById(appParams.idSendMessage);
const status = document.getElementById(appParams.idStatus);
const messages = document.getElementById(appParams.idMessages);

username.addEventListener("keypress", onChangeUsernameKeypress);
message.addEventListener("keypress", onNewMessageKeypress);
changeUsernameButton.addEventListener("click", onChangeUsernameClick);
setUserColorButton.addEventListener("change", onUserColorChange);
sendMessageButton.addEventListener("click", onSendMessageButtonClick);

function onChangeUsernameKeypress(event) {
  if (event.keyCode === 13) {
    event.currentTarget.blur();
    changeUsernameButton.click();
  }
}

function onNewMessageKeypress(event) {
  socket.emit("typing");
  if (event.keyCode === 13) {
    sendMessageButton.click();
  }
}

socket.on("add_mess", (data) => {
  status.textContent = "";
  message.value = "";
  messages.insertAdjacentHTML(
    "beforeend",
    `<div style="color:${data.usercolor}"><b style="color:${data.usercolor}">${data.username}</b>: ${data.message}</div>`
  );
  messages.scrollTop = messages.scrollHeight;
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
    usercolor: setUserColorButton.value,
  });
}

function onUserColorChange() {
  socket.emit("change_usercolor", { usercolor: setUserColorButton.value });
}

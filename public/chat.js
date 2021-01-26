appParams = {
  server: "http://localhost:3000",
  idUserName: "username",
  idUserColor: "user-color",
  idChangeUsername: "change-username",
  idStatus: "status",
  idMessages: "messages",
  idNewMessage: "new-message",
  idSendMessage: "send-message",
};

const socket = io.connect(appParams.server);
const messageField = document.getElementById(appParams.idNewMessage);
const userNameField = document.getElementById(appParams.idUserName);
const setUserColorButton = document.getElementById(appParams.idUserColor);
const changeUsernameButton = document.getElementById(appParams.idChangeUsername);
const sendMessageButton = document.getElementById(appParams.idSendMessage);
const statusField = document.getElementById(appParams.idStatus);
const messagesBox = document.getElementById(appParams.idMessages);

const TYPING_MAX_DELAY = 3000;
let typingDelayHandler;

userNameField.addEventListener("keypress", onChangeUsernameKeypress);
messageField.addEventListener("keypress", onNewMessageKeypress);
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
  clearTimeout(typingDelayHandler);
  typingDelayHandler = setTimeout(function () {
    socket.emit("stop_typing");
  }, TYPING_MAX_DELAY);
  if (event.keyCode === 13) {
    sendMessageButton.click();
  }
}

socket.on("add_mess", (data) => {
  messages.insertAdjacentHTML(
    "beforeend",
    `<div style="color:${data.usercolor}"><b style="color:${data.usercolor}">${data.username}</b>: ${data.message}</div>`
  );
  messages.scrollTop = messages.scrollHeight;
});

socket.on("typing", (data) => {
  statusField.textContent = `${data.username} is typing...`;
});

socket.on("stop_typing", () => {
  statusField.textContent = "";
});

function onChangeUsernameClick() {
  socket.emit("change_username", { username: userNameField.value });
}

function onSendMessageButtonClick() {
  clearTimeout(typingDelayHandler);
  socket.emit("stop_typing");
  socket.emit("new_message", {
    message: messageField.value,
    usercolor: setUserColorButton.value,
  });
  messageField.value = "";
}

function onUserColorChange() {
  socket.emit("change_usercolor", { usercolor: setUserColorButton.value });
}

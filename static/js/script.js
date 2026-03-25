
const btn = document.getElementById("chatbotButton");
const box = document.getElementById("chatbotBox");
const input = document.getElementById("chatInput")
const msgs = document.getElementById("chatMessages");

btn.addEventListener("click", () => {
      box.classList.toggle("hidden");
});
const send = document.getElementById("chatboxSend");
send.addEventListener("click", () => {
  console.log(input.value);
  const message = input.value;
  const userMsg = document.createElement("p");
  userMsg.textContent = message;
  userMsg.classList.add("chat-msg-user");
  msgs.appendChild(userMsg);
  msgs.scrollTop = msgs.scrollHeight;

  const typing = showTyping();
  fetch("/chatbot/msg", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  })
  .then(res => {
    console.log('Status:', res.status);
    return res.json();
  })
  .then(data => {
    removeTyping()
    console.log("Response from server:", data);
    const msg = document.createElement("p");
    msg.textContent = data.reply;
    msg.classList.add("chat-msg")
    msgs.appendChild(msg);
    msgs.scrollTop = msgs.scrollHeight;
  });
  input.value = "";
  
});
function showTyping() {
  const typing = document.createElement("p");
  typing.id = "typing-indicator";
  typing.classList.add("chat-msg", "typing-dots");
  msgs.appendChild(typing);
  return typing;
}
function removeTyping() {
  const typing = document.getElementById("typing-indicator");
  if (typing) {
    typing.remove();
  }
}
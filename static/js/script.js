
const btn = document.getElementById("chatbotButton");
const box = document.getElementById("chatbotBox");
const input = document.getElementById("chatInput")
const msgs = document.getElementById("chatMessages");
const userTemplate = document.getElementById("userTemplate");
const botTemplate = document.getElementById("botTemplate");
const typingTemplate = document.getElementById("typingTemplate");
btn.addEventListener("click", () => {
      box.classList.toggle("hidden");
});
const send = document.getElementById("chatboxSend");
send.addEventListener("click", () => {
  chatbot();
});
function chatbot() {
  console.log(input.value);
  const message = input.value;
  var clone = userTemplate.content.cloneNode(true);
  const msgEl = clone.querySelector(".chat-msg-user");
  msgEl.textContent = message;
  msgs.appendChild(clone);
  msgs.scrollTo({
    top: msgs.scrollHeight,
    behavior: "smooth"
  })
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
    var clone = botTemplate.content.cloneNode(true);
    const msgEl = clone.querySelector(".chat-msg");
    msgEl.textContent = data.reply;
    msgs.appendChild(clone);
    msgs.scrollTo({
      top: msgs.scrollHeight,
      behavior: "smooth"
    })
  });
  input.value = "";
  
}
function showTyping() {
  const clone = typingTemplate.content.cloneNode(true);
  const typingEl = clone.querySelector(".typing-dots");
  typingEl.id = "typing-indicator";
  msgs.appendChild(clone);
  msgs.scrollTo({
    top: msgs.scrollHeight,
    behavior: "smooth"
  })
  return typingEl;
}
function removeTyping() {
  const typing = document.getElementById("typing-indicator");
  const cloneEl = document.getElementById("cloned-msg");
  if (typing) {
    typing.parentElement.remove();
  }
}
function scrollToSec1(){
  const section1 = document.getElementById("section1");
  section1.scrollIntoView({
    behaviour: "smooth",
    block: "start"
  })
}
input.addEventListener("focus", ()=> {
  input.addEventListener("keydown", (event)=>{
    if (event.key === 'Enter') {
      chatbot();
    }
  })
});
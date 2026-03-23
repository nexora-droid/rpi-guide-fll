
const btn = document.getElementById("chatbotButton");
const box = document.getElementById("chatbotBox");
const input = document.getElementById("chatInput")
btn.addEventListener("click", () => {
      box.classList.toggle("hidden");
});
const send = document.getElementById("chatboxSend");
send.addEventListener("click", () => {
  console.log(input.value);
  input.value = "";
});


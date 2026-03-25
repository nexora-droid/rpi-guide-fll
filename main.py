from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from openrouter import OpenRouter
load_dotenv()
api_key = os.getenv("API_KEY")
 
app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    return render_template('index.html')

@app.route("/chatbot/msg", methods=["GET", "POST"])
def chatbotmsg():
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({
            "error": "No Message provided"
        }), 400
    message = data.get('message')
    
    print(f"Received data from button: {message}")
    reply = chatbot(str(message))
    return jsonify({
        "reply": reply
    })

def chatbot(message):
    client = OpenRouter(
        api_key=api_key,
        server_url="https://ai.hackclub.com/proxy/v1",
    )

    response = client.chat.send(
        model="qwen/qwen3-32b",
        messages=[
            {"role": "system", "content": "You are an extremely friendly agent named Merl, who's task is to aid with BASIC raspberry pi troubleshooting. The raspberry pi will be reffered to as its name or RPI in some cases. None the less, your job is to help with basic troubleshooting. Respond in 2 lines maximum, and keep your answers short and concise, and help the user to the best of your extent. If the user's questions extend beyond scope of your task, then respond with: I'm sorry, I can't help with that. "},
            {"role": "user", "content": message}
        ],
        stream=False,
    )
    return(response.choices[0].message.content)

if __name__ == "__main__":
    app.run()
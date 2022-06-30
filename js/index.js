let ws = new WebSocket("ws://localhost:8000/ws")

ws.onmessage = function(event) {
    let messages = document.getElementById('messages')
    let message = document.createElement('li')

    let response_body = JSON.parse(event.data)
    let content = document.createTextNode(response_body.counter + ' ' + response_body.message)
    
    message.appendChild(content)
    messages.appendChild(message)
};

function sendMessage(event) {
    let input = document.getElementById("messageText")

    ws.send(JSON.stringify({"message": input.value}))

    input.value = ''
    
    event.preventDefault()
}
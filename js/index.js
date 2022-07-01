let ws = new WebSocket("ws://localhost:8000/ws")

ws.onmessage = function(event) {
    let response_body = JSON.parse(event.data)
    if (response_body.sender_id != response_body.receiver_id){
        messages = document.getElementById('messages')
    } else{
        messages = document.getElementById('other_messages')
    }
    //let messages = document.getElementById('messages')
    let message = document.createElement('li')
    let content = document.createTextNode('user_id: ' + response_body.sender_id + ' - ' + response_body.counter + ' ' + response_body.message)
    
    message.appendChild(content)
    messages.appendChild(message)
};


function sendMessage(event) {
    let input = document.getElementById("messageText")

    ws.send(JSON.stringify({"message": input.value}))

    input.value = ''
    
    event.preventDefault()
}
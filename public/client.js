let ws;
let chatUsersContainer = document.querySelector('.chat-users')
let chatUsersCount = document.querySelector('.users-count')
let sendMessageForm = document.querySelector('#messageForm')
let MessageInput = document.querySelector('#MessageInput')

window.addEventListener('DOMContentLoaded', () => {
    ws = new WebSocket('ws://localhost:3000/ws');
    ws.addEventListener('open', onConnectionOpen);
    ws.addEventListener('message', OnMessageReceived);
})

sendMessageForm.onsubmit = e => {
    e.preventDefault();
    const event = {
        event: 'message',
        data: MessageInput.value
    }
    console.log(event)
    ws.send(JSON.stringify(event))
    MessageInput.value = ''
}

function onConnectionOpen() {
    console.log('Connection open');
    const queryParams = getQueryParams();
    console.log(queryParams);
    if (!queryParams.name || !queryParams.group) {
        window.location.href = 'Login.html';
        return;
    }
    const event = {
        event: 'join',
        groupName: queryParams.group,
        name: queryParams.name
    }
    ws.send(JSON.stringify(event));
}

function OnMessageReceived(event) {
    console.log('Msg received');
    event = JSON.parse(event.data)
    console.log(event)
    switch (event.event) {
        case 'users':
            chatUsersContainer.innerHTML = ''
            chatUsersCount.innerHTML = event.data.length
            console.log('Event data', event.data)
            event.data.forEach(element => {
                const userEl = document.createElement('div')
                userEl.className = 'chat-user'
                userEl.innerHTML = element.name
                chatUsersContainer.appendChild(userEl)
            });
            break;
    }
}

function getQueryParams() {
    const search = window.location.search.substring(1); // Elimina el signo ? del query
    const pairs = search.split('&'); // Divide la cadena en los querys que existan, ej: hola=email&email=hola => (hola=email,email=hola)
    const params = {};
    for (const pair of pairs) {
        const parts = pair.split('='); // Separa los parámetros en clave y valor
        params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]); // parts[0] es el nombre del query y part[1] es el valor
    }

    return params;
}
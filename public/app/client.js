let ws;
let chatUsersContainer = document.querySelector(".chat-users");
let chatUsersCount = document.querySelector(".users-count");
let sendMessageForm = document.querySelector("#messageForm");
let MessageInput = document.querySelector("#MessageInput");
let chatMessages = document.querySelector("#chatContent");

window.addEventListener("DOMContentLoaded", () => {
	ws = new WebSocket("ws://localhost:3000/ws");
	ws.addEventListener("open", onConnectionOpen);
	ws.addEventListener("message", OnMessageReceived);
});

sendMessageForm.onsubmit = (e) => {
	e.preventDefault();
	const event = {
		event: "message",
		data: MessageInput.value,
	};
	//console.log(event);
	ws.send(JSON.stringify(event));
	MessageInput.value = "";
};

function onConnectionOpen() {
	console.log("Connection open");
	const queryParams = getQueryParams();
	console.log(queryParams);
	if (!queryParams.name || !queryParams.group) {
		window.location.href = "Login.html";
		return;
	}
	const event = {
		event: "join",
		groupName: queryParams.group,
		name: queryParams.name,
	};
	ws.send(JSON.stringify(event));
}

function OnMessageReceived(event) {
	//console.log("Msg received");
	event = JSON.parse(event.data);
	console.log(event);
	switch (event.event) {
		case "users":
			chatUsersContainer.innerHTML = "";
			chatUsersCount.innerHTML = "Users: " + event.data.length;
			event.data.forEach((key) => {
				const userEl = document.createElement("div");
				userEl.className = "chat-user";
				userEl.innerHTML = key.name;
				chatUsersContainer.appendChild(userEl);
			});
			break;

		case "message":
			const scrollHeight = chatMessages.scrollHeight;
			const scrollPos = chatMessages.offsetHeight + chatMessages.scrollTop;
			newMessage(event.data);
			if (scrollHeight === scrollPos) {
				chatMessages.scrollTo(0, chatMessages.scrollHeight);
			}
			break;

		case "messageHistory":
			event.data.forEach(newMessage);
			break;
	}
}

function newMessage(message) {
	const messageEl = document.createElement("div");
	messageEl.className = `message ${
		message.sender === "me" ? "sent" : "received"
	}`;
	messageEl.innerHTML = `
				${message.sender === "me" ? "" : `<h4>${message.name}</h4>`}
				<p>
					${message.message}
				</p>
			`;
	chatMessages.appendChild(messageEl);
	return;
}

function getQueryParams() {
	const search = window.location.search.substring(1); // Elimina el signo ? del query
	const pairs = search.split("&"); // Divide la cadena en los querys que existan, ej: hola=email&email=hola => (hola=email,email=hola)
	const params = {};
	for (const pair of pairs) {
		const parts = pair.split("="); // Separa los parámetros en clave y valor
		params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]); // parts[0] es el nombre del query y part[1] es el valor
	}

	return params;
}

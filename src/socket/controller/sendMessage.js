import { getGroup } from "../model/groups.js";

export function sendMessage(groupName, message, senderId) {
	const users = getGroup(groupName);
	for (const user of users) {
		const checkMessage = {
			...message,
			sender: user.userId === senderId ? "me" : senderId, // TODO Esto causa que si se refresca la página, el que envió el mensaje no lo ve así
		};

		const event = {
			event: "message",
			data: checkMessage,
		};

		console.log("sendmessage.js", event);

		user.ws.send(JSON.stringify(event));
	}
	return;
}

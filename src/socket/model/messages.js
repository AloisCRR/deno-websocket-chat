import { sendMessage } from "../controller/sendMessage.js";
import { sendMessagesHistory } from '../controller/sendMessagesHistory.js'

const messagesMap = new Map();

/* groupName: [message1, message2]

{
    userId: string,
    name: string,
    message: string
} */

export function getMessages(groupName) {
	const r = messagesMap.get(groupName) || [];
	return r;
}

export function messageHistory(groupName, webSocket) {
	const messages = getMessages(groupName);

	const event = {
		event: 'messageHistory',
		data: messages
	}

	sendMessagesHistory(event, webSocket);
	
	return;
}

export function setMessages(userId, groupName, name, message) {
	const messages = getMessages(groupName);

	const messageData = {
		userId,
		name,
		message,
	};

	messages.push(messageData);

	messagesMap.set(groupName, messages);

	sendMessage(groupName, messageData, userId);

	return;
}

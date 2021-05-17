import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";

import { onExit, userJoin, getUser } from "./users.js";
import { setMessages, messageHistory } from "./messages.js";

export default async function chat(ws) {
	console.log("Chat connected");
	const userId = v4.generate();

	for await (let data of ws) {
		const event = typeof data === "string" ? JSON.parse(data) : data;

		if (isWebSocketCloseEvent(data)) {
			onExit(userId);
		}

		switch (event.event) {
			case "join":
				userJoin(userId, event.name, event.groupName, ws);
				messageHistory(event.groupName, ws);

				break;
			case "message":
				const user = getUser(userId);
				setMessages(user.userId, user.groupName, user.name, event.data);

				break;
		}
	}
}

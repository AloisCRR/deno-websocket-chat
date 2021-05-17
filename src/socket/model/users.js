import { setGroup, getGroup } from "./groups.js";
import { sendUserList } from "../controller/sendUserList.js";

const usersMap = new Map();

/*usersMap -> userId: {
    name: string,
    groupName: string,
    ws: WebSocket
} */

export function userJoin(userId, name, groupName, ws) {
	const userData = {
		userId,
		name,
		groupName,
		ws,
	};

	setUser(userId, userData);

	const users = getGroup(groupName);

	users.push(userData);

	setGroup(groupName, users);

	sendUserList(groupName);

	return;
}

export function onExit(userId) {
	const user = getUser(userId);

	if (!user) {
		return;
	}

	let users = getGroup(user.groupName);

	users = users.filter((u) => u.userId != userId);

	setGroup(user.groupName, users);

	deleteUser(userId);

	sendUserList(user.groupName);

	return;
}

export function setUser(userId, userData) {
	usersMap.set(userId, userData); // Id, datos del usuario
	return;
}

export function getUser(userId) {
	const r = usersMap.get(userId) || [];
	return r;
}

export function getUserObject(groupName) {
	const users = getGroup(groupName);
	return users.map((e) => {
		return { userId: e.userId, name: e.name };
	});
}

export function deleteUser(userId) {
	usersMap.delete(userId);
	return;
}

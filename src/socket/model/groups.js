const groupsMap = new Map();

/*groupsMap -> groupName: [user1, user2]

{
    userId: string,
    userName: string,
    ws: WebSocket
} */

export function setGroup(groupName, users) {
    groupsMap.set(groupName, users);
    return;
}

export function getGroup(groupName) {
    const r = groupsMap.get(groupName) || [];
    return r;
}
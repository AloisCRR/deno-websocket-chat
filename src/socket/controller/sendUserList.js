import { getGroup } from '../model/groups.js'
import { getUserObject } from '../model/users.js'

export function sendUserList(groupName) {
    const users = getGroup(groupName) || [];
    
    for (const user of users) {
        const event = {
            event: 'users',
            data: getUserObject(groupName)
        }
        user.ws.send(JSON.stringify(event));
    }
}
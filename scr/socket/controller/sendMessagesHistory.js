export function sendMessagesHistory(messages, ws) {
    ws.send(JSON.stringify(messages));
    return;
}
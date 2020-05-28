import { listenAndServe } from "https://deno.land/std/http/server.ts";
import {acceptWebSocket, acceptable} from "https://deno.land/std/ws/mod.ts";
import chat from './socket/model/chat.js';

listenAndServe({port: 3000}, async req => {    
    if (acceptable(req)) {
        acceptWebSocket({
            conn: req.conn,
            bufWriter: req.w,
            bufReader: req.r,
            headers: req.headers
        }).then(chat);
    }
});
console.log('Server on port 3000');

// Folder structure https://veskedevelopment.wordpress.com/2015/04/14/spring-websocket/
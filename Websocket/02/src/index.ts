import type { Response, Request } from "express";
import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import express from "express";

const app = express();
const PORT = 8080;

const server = http.createServer(app);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "WebSockets Server is running.",
        status: "HTTP OK",
    });
});

const wss = new WebSocketServer({ server });

const clients: Set<WebSocket> = new Set();

wss.on('connection', (ws: WebSocket) => {
    console.log("A new client connected to the chat server.");
    clients.add(ws);

    ws.send('Welcome! You are connected to the chat.');

    ws.on('message', (message: Buffer) => {
        const incomingMessage = message.toString();
        console.log(`Received: "${incomingMessage}"`);

        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                 client.send(`[User]: ${incomingMessage}`);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
        clients.delete(ws);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`HTTP endpoint: http://localhost:${PORT}/`);
    console.log(`WebSocket endpoint: ws://localhost:${PORT}/`);
});
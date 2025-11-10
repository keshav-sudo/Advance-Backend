// src/index.ts
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express(); // ✅ Express app
const server = http.createServer(app); // ✅ HTTP server wrap with Express

// ✅ Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins (for now)
  },
});

// ✅ When a client connects
io.on("connection", (socket: Socket) => {
  console.log("✅ New client connected:", socket.id);

  // Listen for message event from client
  socket.on("message", (data : string) => {
    console.log("📩 Message received:", data);

    // Send message to all connected clients (broadcast)
    io.emit("broadcast", `Server received: ${data}`);
  });

  // Send welcome message to the connected client
  socket.emit("welcome", "👋 Hello from server!");

  // When client disconnects
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Express route example
app.get("/", (req, res) => {
  res.send("🚀 WebSocket + Express server is running!");
});

// ✅ Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

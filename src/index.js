import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// we found file and folders path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// public to static folder serve
app.use(express.static(path.join(__dirname, "public"))); 



io.on("connection", (socket) => {
  console.log("A user connected ✅");

  socket.on("secondItem", (data) => {
    io.emit("secondItem", data);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected ❌");
  });
});

server.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));

// server.js
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", socket => {
    console.log("Client connected:", socket.id);

    socket.on("join", userId => {
      socket.join(userId); // each user has their own room
    });
  });

  global.io = io; // make io accessible globally

  server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});

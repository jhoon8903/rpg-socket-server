const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

console.log("Server opened on port", wss.address().port);

wss.on("connection", function connection(client) {
  console.log("Client connected");
  client.on("message", function incoming(message) {
    try {
      const chatMessage = JSON.parse(message);
      console.log(`Received message from ${chatMessage.User}: ${chatMessage.Message}`);
      broadcastMessage(message);
    } catch (e) {
      console.error("Error parsing message:", e.message);
    }
  });
  client.send(JSON.stringify({ User: "Server", Message: "Hello from server!" }));
});

function broadcastMessage(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

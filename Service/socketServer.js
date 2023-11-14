import WebSocket, { WebSocketServer } from 'ws';

// Export a setup function to attach the WebSocket server to the HTTP server
export default function setup(server) {
  const wss = new WebSocketServer({ server });

  console.log('WebSocket server attached.');

  wss.on('connection', function connection(client) {
    console.log('Client connected');
    client.on('message', function incoming(message) {
      try {
        const chatMessage = JSON.parse(message);
        console.log(
          `Received message from ${chatMessage.User}: ${chatMessage.Message}`,
        );
        broadcastMessage(message);
      } catch (e) {
        console.error('Error parsing message:', e.message);
      }
    });
    client.send(
      JSON.stringify({ User: 'Server', Message: 'Hello from server!' }),
    );
  });

  function broadcastMessage(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

import express from 'express';
import bodyParser from 'body-parser';
import characterRoutes from './Route/character.route.js';
import itemRoutes from './Route/item.route.js';
import socketServer from './Service/socketServer.js';
import http from 'http';

const app = express();
const port = 3000;
const host = '52.78.28.10';

app.use(bodyParser.json());
app.use('/character', characterRoutes);
app.use('/item', itemRoutes);

const server = http.createServer(app);

socketServer(server);

app.listen(port, () => {
  console.log(`listening on http://${host}:${port}`);
});

const http = require('http');
const port = process.env.PORT || 4000;
const app = require('./app');

const server = http.createServer(app);
console.log("started running on port 3000");

server.listen(port);
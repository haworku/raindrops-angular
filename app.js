const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
app.set('port', process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, './')));
app.use((request, response) => {
  response.sendFile(path.join(__dirname, './index.html'));
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Server running at 127.0.0.1:${app.get('port')}...`);
});

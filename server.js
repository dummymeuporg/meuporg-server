require(`${__dirname}/config.js`);
const client = require('./client.js');
const fs = require('fs');
const net = require('net');

let loadResources = (dir, callback=undefined) => {
  let files = fs.readdirSync(`${__dirname}/${dir}`);
  if (callback === undefined) {
    files.forEach((file) => {
      console.log(`Loading ${dir}${mapFile}`);
      require(`${dir}/${file}`);
    });
  } else {
    files.forEach(callback);
  }
}

let maps = {};

loadResources("initializers");
loadResources("models");
loadResources(dir=config.data_paths.maps, (mapFile) => {
  console.log(`Loading map: ${dir}${mapFile}`);
  var map = require(__dirname + dir + mapFile);
  maps[map.room] = map;
});

net.createServer((socket) => {

  let thisClient = new client.Client();
  thisClient.initiate();

  thisClient.socket = socket;

  socket.on('error', (err) => {
    thisClient.err(err);
  });
  socket.on('end', () => {
    thisClient.end();
  });
  socket.on('data', (data) => {
    thisClient.data(data);
  });

}).listen(config.port);

console.log(`Config is ${config.environment}`);
console.log(`Initialize completed. Server running on port ${config.port}`);
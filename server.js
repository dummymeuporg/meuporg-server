require(`${__dirname}/config.js`);
let fs = require('fs');
let net = require('net');

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
}).listen(config.port);

console.log(`Initialize completed. Server running on port ${config.port}`);
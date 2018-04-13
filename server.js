require(__dirname + "/config.js");
let fs = require('fs');
let net = require('net');

let loadResources = (dir, callback=undefined) => {
    let files = fs.readdirSync(__dirname + '/' + dir);
    if (callback === undefined) {
        files.forEach((file) => {
            console.log('Loading ' + dir + ': ' + file);
            require(dir + '/' + file);
        });
    } else {
        files.forEach(callback);
    }
}

let maps = {};

try {
    loadResources("initializers");
    loadResources("models");
    loadResources(config.data_paths.maps, (mapFile) => {
        console.log("Loading map: " + config.data_paths.maps + mapFile);
        maps[map.room] = map;
    });
} catch(error) {
    console.error("Error while loading resources: " + error);
}
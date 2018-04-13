let args = require('minimist')(process.argv.slice(2));
let extend = require('extend');


let environment = args.env || "test";

let common_conf = {
  name: "meuporg PoC of MMO Game Server",
  version: "0.0.1",
  environment: environment,
  max_players: 100,
  data_paths: {
    items: "/game_data/items/",
    maps: "/game_data/maps/",
  },
  starting_zone: "rm_map_home",
};

let conf = {
  production: {
    ip: args.ip || "0.0.0.0",
    port: args.port || 8081,
    database: "mongodb://127.0.0.1/meuporg_prod"
  },
  test: {
    ip: args.ip || "0.0.0.0",
    port: args.port || 8082,
    database: "mongodb://127.0.0.1/meuporg_test"
  }
}

extend(false, conf.production, common_conf);
extend(false, conf.test, common_conf);

module.exports = config = conf[environment];
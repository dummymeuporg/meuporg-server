const now = require('performance-now');
const _ = require('underscore');


class Client {
  initiate() {

  }

  data(data) {
    console.log(`Client data: ${data.toString()}`);
  }

  err(err) {
    console.log(`Client error: ${err}`);
  }

  end() {
    console.log("Client end.")
  }
}

module.exports = {Client};
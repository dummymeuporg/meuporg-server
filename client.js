const now = require('performance-now');
const _ = require('underscore');


class Client {
  constructor(socket) {
    this.socket = socket;
  }

  initiate() {
    // Send the connection handshake packet to the client.
    this.socket.write(packet.build(["HELLO", now.toString()]));
    console.log("Initiated client.");
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
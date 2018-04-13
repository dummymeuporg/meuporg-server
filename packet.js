let zeroBuffer = new Buffer('00', 'hex');

module.exports = packet = {
  // params: an array of javascript objects to be turned into buffers.
  build: (params) => {
    let packetParts = [];
    let packetSize = 0;

    params.forEach((param) => {
      let buffer;
      if (typeof param === "string") {
        buffer = new Buffer(param, 'utf8');
        buffer = Buffer.concat([buffer, zeroBuffer], buffer.length + 1);
      } else if (typeof param === "number") {
        buffer = new Buffer(2);
        buffer.writeUInt16LE(param, 0);
      } else {
        console.log("Warning: Unkown data type in packet builder!");
      }

      packetSize += buffer.length;
      packetParts.push(buffer);
    });

    var dataBuffer = Buffer.concat(packetParts, packetSize);

    let size = new Buffer(1);
    size.writeUInt8(dataBuffer.length + 1, 0);

    let finalPacket = Buffer.concat([size, dataBuffer], size.length + dataBuffer.length);
    return finalPacket;
  }
}
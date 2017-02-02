const http = require('http');

const sayHello = (endpoint) => {
  console.log('Sending hello!');
  const request = http.request({
    host: endpoint.host,
    port: endpoint.port,
    method: 'POST',
    withCredentials: false,
  }, (resp) => {
    let respMsg;

    resp.on('data', (dataChunk) => {
      if (respMsg === undefined || respMsg === null) {
        respMsg = dataChunk;
      } else {
        respMsg += dataChunk;
      }
    });

    resp.on('end', () => {
      console.log(respMsg);
    });
  });

  request.end();
};

module.exports = {
  sayHello,
};

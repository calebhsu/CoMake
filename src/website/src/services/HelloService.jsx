import http from 'http';

import { HELLO_SERVICE } from './Endpoints';

const HelloRequest = () => {
  console.log('Sending hello!');
  http.request({
    host: HELLO_SERVICE.host,
    port: HELLO_SERVICE.port,
    method: 'POST',
  }, (resp) => {
    let respMsg;

    resp.on('data', (dataChunk) => {
      respMsg += dataChunk;
    });

    resp.on('end', () => {
      console.log(JSON.parse(respMsg));
    });
  });
};

export const HelloService = {
  request: HelloRequest,
};

export default HelloService;

import http from 'http';

import { HELLO_SERVICE } from './Endpoints';

const HelloRequest = () => {
  console.log('Sending hello!');
  const request = http.request({
    host: HELLO_SERVICE.host,
    port: HELLO_SERVICE.port,
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

export const HelloService = {
  request: HelloRequest,
};

export default HelloService;

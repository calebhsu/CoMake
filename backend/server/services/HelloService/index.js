const admin = require('firebase-admin');

const handle = (req, res) => {
  console.log('Recieved a hello, sending one back');

  admin.database().ref('/hello_service').set(Math.random());

  res.set('Access-Control-Allow-Origin', '*');

  res.send('Hello there!');
};

module.exports = {
  handle,
};

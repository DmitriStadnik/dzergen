// const mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
let db;

if (process.env.NODE_ENV !== 'production') {
  const env = require('node-env-file'); // щтоб вытащить URI из файла
  env('./env/.env');
}

const uri = process.env.URI;

function connect(callback){
  // mongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
  //   console.log('mongodb connect success');
  //   console.log(client)
  //   db = client.db;
  //   callback();
  // });

  mongoose.connect(uri, function (err) {
    if (err) callback;
    console.log('Successfully connected');
 });
}
function get(){
  return db;
}

function close(){
  db.close();
}

module.exports = {
  connect,
  get,
  close,
};
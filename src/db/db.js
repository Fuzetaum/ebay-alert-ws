const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;

const { DB_NAME, DB_HOST, DB_PORT } = process.env;
const client = new MongoClient(new Server(DB_HOST, DB_PORT), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getAlert = (alert, cb) => {
  client.connect((connectError, mongoClient) => {
    if (connectError) throw connectError;
    const db = mongoClient.db(DB_NAME);
    db.collection('alerts').findOne({ email: alert.email, query: alert.query }, (err, result) => {
      cb(err, result);
      mongoClient.close();
    });
  });
};

const updateAlert = (alert, cb) => {
  client.connect((connectError, mongoClient) => {
    if (connectError) throw connectError;
    const db = mongoClient.db(DB_NAME);
    db.collection('alerts').updateOne({ email: alert.email, query: alert.query },
      { $set: { frequency: alert.frequency } }, (err, result) => {
        cb(err, result);
        mongoClient.close();
      });
  });
};

module.exports = {
  getAlert,
  updateAlert,
};

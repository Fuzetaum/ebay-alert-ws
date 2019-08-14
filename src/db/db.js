const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;

const { DB_NAME, DB_HOST, DB_PORT } = process.env;
const client = new MongoClient(new Server(DB_HOST, DB_PORT), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

client.connect((connectError, mongoClient) => {
  if (connectError) throw connectError;
  db = mongoClient.db(DB_NAME);
});

const createAlert = (alert, cb) => {
  db.collection('alerts').findOne({ email: alert.email, query: alert.query }, (findError, result) => {
    if (findError) throw findError;
    if (!result) {
      db.collection('alerts').insertOne(alert, (err, result) => {
        cb(err, result);
      });
    } else {
      cb(null, { message: 'Alert configuration already exists' });
    }
  });
};

const getAlerts = (cb) => {
  db.collection('alerts').find({}).toArray((err, result) => {
    cb(err, result);
  });
};

const updateAlert = (alert, cb) => {
  db.collection('alerts').updateOne({ email: alert.email, query: alert.query },
    { $set: { frequency: alert.frequency } }, (err, result) => {
      cb(err, result);
    });
};

module.exports = {
  createAlert,
  getAlerts,
  updateAlert,
};

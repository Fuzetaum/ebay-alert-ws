const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;

let db;

const connect = () => {
  const mongoConnect = () => {
    const { DB_NAME, DB_HOST, DB_PORT } = process.env;
    const client = new MongoClient(new Server(DB_HOST, DB_PORT), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect((connectError, mongoClient) => {
      if (connectError) {
        console.log('Could not establish connection with MongoDB');
        console.log('Trying again in 5 seconds');
        setTimeout(mongoConnect, 5000);
      } else {
        db = mongoClient.db(DB_NAME);
        console.log('Connection with MongoDB successful');
      }
    });
  };

  mongoConnect();
};

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
  connect,
  createAlert,
  getAlerts,
  updateAlert,
};

require('dotenv').config();
const express = require('express');
const { createAlert, getAlerts, updateAlert } = require('./db/db');

const app = express();
app.use(express.json());

app.get('/alerts', (req, res) => {
  console.log(`GET request`);
  getAlerts((_, data) => res.send(data));
});

app.patch('/alert', (req, res) => {
  const alert = req.body;
  console.log(`PATCH request -> email=${alert.email}, query="${alert.query}", frequency=${alert.frequency}`);
  updateAlert(alert, (err, newData) => {
    if (err) throw err;
    res.send(newData);
  });
});

app.post('/alert', (req, res) => {
  const alert = req.body;
  console.log(`POST request -> email=${alert.email}, query="${alert.query}", frequency=${alert.frequency}`);
  createAlert(alert, (err, newData) => {
    if (err) throw err;
    res.send(newData);
  });
});

app.listen(3000);
console.log('App is up, listening on port 3000');

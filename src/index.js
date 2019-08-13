require('dotenv').config();
const express = require('express');
const { getAlert, updateAlert } = require('./db/db');

const app = express();
app.use(express.json());

app.get('/alert/:email/:query', (req, res) => {
  const alert = { email: req.params.email, query: req.params.query };
  getAlert(alert, (_, data) => res.send(data));
});

app.post('/alert', (req, res) => {
  const alert = req.body;
  updateAlert(alert, (err, newData) => {
    if (err) throw err;
    res.send(newData);
  });
});

app.listen(3000);

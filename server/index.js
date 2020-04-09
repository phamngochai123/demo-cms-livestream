const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
let elString = '', elObj = {};
app.post('/demo', (req, res) => {
  elString = req.body.elString || '';
  res.send({ ok: true });
})
app.post('/demo-obj', (req, res) => {
  elObj = req.body || {};
  res.send({ ok: true });
})
app.get('/demo', (req, res) => {
  res.send({
    elString
  });
})
app.get('/demo-obj', (req, res) => {
  res.send(elObj);
})
app.get('/demo-sendScript', (req, res) => {
  res.send(`onLoadCountdown();`);
})

app.listen(6001, () => {
  console.log('chạy')
});
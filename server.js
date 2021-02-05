const path = require('path');
const express = require('express');
const app = express();

const { HOST, PORT } = process.env;

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  console.log('Page not found.');
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://${HOST}:${PORT}`);
});

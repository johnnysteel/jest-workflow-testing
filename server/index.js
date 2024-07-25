// server/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/echo', (req, res) => {
  res.json(req.body);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;

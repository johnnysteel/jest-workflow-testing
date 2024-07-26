// server/index.js
const express = require('express');
const redis = require('redis');
const app = express();
const port = process.env.PORT || 3000;

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({
  url: redisUrl
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function connectToRedis() {
  await client.connect();
  console.log('Connected to Redis');
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/echo', (req, res) => {
  res.json(req.body);
});

if (require.main === module) {
  connectToRedis().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((err) => {
    console.error('Failed to connect to Redis:', err);
  });
}

module.exports = { app, client, connectToRedis };

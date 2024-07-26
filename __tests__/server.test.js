// __tests__/server.test.js
const request = require('supertest');
const { app, client, connectToRedis } = require('../server/index');

let server;

beforeAll(async () => {
  client.on('error', (err) => console.error('Redis Client Error', err));
  await connectToRedis();
});

afterAll(async () => {
  await client.disconnect();
});

beforeEach((done) => {
  server = app.listen(3001, done);  // Use a different port to avoid conflict
});

afterEach((done) => {
  server.close(done);
});

describe('GET /', () => {
  it('should return Hello World', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello World!');
  });
});

describe('GET /non-existent', () => {
  it('should return 404 for non-existent route', async () => {
    const res = await request(server).get('/non-existent');
    expect(res.statusCode).toEqual(404);
  });
});

describe('POST /echo', () => {
  it('should echo the posted data', async () => {
    const data = { message: 'Hello, World!' };
    const res = await request(server)
      .post('/echo')
      .send(data)
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(data);
  });
});

// __tests__/server.test.js
const request = require('supertest');
const app = require('../server/index');

let server;

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
    expect(res.text).toBe('Hello Worlds!');
  });
});

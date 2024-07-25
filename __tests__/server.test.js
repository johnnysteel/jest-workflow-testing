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
    expect(res.text).toBe('Hello World!');
  });
});

describe('GET /non-existent', () => {
  it('should return 404 for non-existent route', async () => {
    const res = await request(server).get('/non-existent');
    expect(res.statusCode).toEqual(405);
  });
});

// Add a mock POST route for testing in server/index.js
// app.post('/echo', (req, res) => res.json(req.body));

describe('POST /echo', () => {
  it('should echo the posted data', async () => {
    const data = { message: 'Hello, World!' };
    const res = await request(server)
      .post('/echo')
      .send(data)
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(202);
    expect(res.body).toEqual(data);
  });
});

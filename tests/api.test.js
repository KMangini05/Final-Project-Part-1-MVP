const request = require('supertest');
const app = require('../server');

describe('API Tests - Users', () => {

  it('CREATE user - success', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test', email: 'test@test.com' });

    expect(res.statusCode).toBe(201);
  });

  it('CREATE user - fail', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({});

    expect(res.statusCode).toBe(400);
  });

});

describe('API Tests - Exercises', () => {

  it('CREATE exercise - success', async () => {
    const res = await request(app)
      .post('/api/exercises')
      .send({ name: 'Run', category: 'Cardio' });

    expect(res.statusCode).toBe(201);
  });

  it('CREATE exercise - fail', async () => {
    const res = await request(app)
      .post('/api/exercises')
      .send({});

    expect(res.statusCode).toBe(400);
  });

});

describe('API Tests - Logs', () => {

  it('CREATE log - success', async () => {
    const res = await request(app)
      .post('/api/logs')
      .send({
        userId: 1,
        exerciseId: 1,
        duration: 30,
        date: '2026-01-01'
      });

    expect(res.statusCode).toBe(201);
  });

  it('CREATE log - fail', async () => {
    const res = await request(app)
      .post('/api/logs')
      .send({});

    expect(res.statusCode).toBe(400);
  });

});
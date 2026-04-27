const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../database/setup');

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

// USER TESTS
describe('API Tests - Users', () => {

  it('CREATE user - success', async () => {
    // Create user
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'test@test.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User')
  });

  it('CREATE user - fail (missing data)', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it('GET users - success', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true);
  });

});

// EXERCISE TESTS
describe('API Tests - Exercises', () => {

  it('CREATE exercise - success', async () => {
    const res = await request(app)
      .post('/api/exercises')
      .send({ name: 'Run', category: 'Cardio' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('CREATE exercise - fail', async () => {
    const res = await request(app)
      .post('/api/exercises')
      .send({});

    expect(res.statusCode).toBe(400);
  });

});

// LOG TESTS
describe('API Tests - Logs', () => {

  it('CREATE log - success', async () => {

    // Create User
    const user =await request(app)
      .post('/api/users')
      .send({ name: 'Log User', email: 'log@test.com' });

    //Create Exercise
    const exercise = await request(app)
      .post('/api/exercises')
      .send({ name: 'Run', category: 'Cardio'});

    const res = await request(app)
      .post('/api/logs')
      .send({
        userId: user.body.id,
        exerciseId: exercise.body.id,
        duration: 30,
        date: '2026-01-01'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('CREATE log - fail (missing data)', async () => {
    const res = await request(app)
      .post('/api/logs')
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it('GET logs - success', async () => {
    const res = await request(app).get('/api/logs');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
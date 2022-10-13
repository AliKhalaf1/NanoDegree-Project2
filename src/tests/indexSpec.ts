import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test', () => {
  it('Get the / endpoint', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
  });
});

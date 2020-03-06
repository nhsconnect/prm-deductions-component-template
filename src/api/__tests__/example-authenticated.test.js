import request from 'supertest';
import app from '../../app';

jest.mock('../../middleware/auth');

describe('GET /exampleAuthenticated', () => {
  it('should return a 200 status code when correctly authenticated', done => {
    request(app)
      .get('/example-authenticated')
      .set('Authorization', 'correct-key')
      .expect(200)
      .end(done);
  });
});

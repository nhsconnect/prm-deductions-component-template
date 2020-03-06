import request from 'supertest';
import app from '../../app';

// When we are unit testing for middleware, we do not want to mock the middleware:
// Instead we wish to test the logic in the middleware

// In all other unit tests we want to pass through all of this logic and should therefore call jest.mock
// jest.mock('') will cakl the manual mock in __mocks__ automatically
describe('auth', () => {
  beforeEach(() => {
    // We should avoid overwriting or relying on environment vars for tests,
    // where possible we should prefer to use the config.
    process.env.AUTHORIZATION_KEYS = 'correct-key,other-key';
  });

  afterEach(() => {
    // If we do need to use environment variables, we want to ensure we have a clean
    // env before each test, and hence should tear-down anything we have set up (beforeEach).
    if (process.env.AUTHORIZATION_KEYS) {
      delete process.env.AUTHORIZATION_KEYS;
    }
  });

  // Jest tests should be split up by logical blocks (paths)
  // This is the happy path
  describe('authenticated successfully', () => {
    it('should return HTTP 200 when correctly authenticated', done => {
      request(app)
        .get('/example-authenticated')
        .set('Authorization', 'correct-key')
        .expect(200)
        .end(done);
    });
  });

  // This is one type of error
  describe('AUTHORIZATION_KEYS environment variables not provides', () => {
    beforeEach(() => {
      // In this case we remove the AUTHORIZATION_KEYS to test the case
      // where they have not been defined
      if (process.env.AUTHORIZATION_KEYS) {
        delete process.env.AUTHORIZATION_KEYS;
      }
    });

    // We should write tests to test exactly one thing where possible
    // In this case, if the error code was wrong, we'd still know if we had the
    // correct error message (below).
    it('should return 412 if AUTHORIZATION_KEYS have not been set', done => {
      request(app)
        .get('/example-authenticated')
        .set('Authorization', 'correct-key')
        .expect(412)
        .end(done);
    });

    // We want to make sure that every line of code (where possible) is covered
    // Then when we come to refactor you can easily see if anything has been affected
    it('should return an explicit error message in the body if AUTHORIZATION_KEYS have not been set', done => {
      request(app)
        .get('/example-authenticated')
        .set('Authorization', 'correct-key')
        .expect(res => {
          expect(res.body).toEqual(
            expect.objectContaining({
              error: 'Authorization keys have not been set, cannot authenticate'
            })
          );
        })
        .end(done);
    });
  });

  describe('Authorization header not provided', () => {
    it('should return HTTP 401 when no authorization header provided', done => {
      request(app)
        .get('/example-authenticated')
        .expect(401)
        .end(done);
    });

    it('should return an explicit error message in the body when no authorization header provided', done => {
      request(app)
        .get('/example-authenticated')
        .expect(res => {
          expect(res.body).toEqual(
            expect.objectContaining({
              error:
                'The request (/example-authenticated) requires a valid Authorization header to be set'
            })
          );
        })
        .end(done);
    });
  });

  describe('incorrect Authorisation header value provided ', () => {
    it('should return HTTP 403 when authorization key is incorrect', done => {
      request(app)
        .get('/example-authenticated')
        .set('Authorization', 'incorrect-key')
        .expect(403)
        .end(done);
    });

    // Prefer object containing if objects are being built, this will allow you to test against the
    // part that is pertinent to the test and not fail because of anything else changing.
    it('should return an explicit error message in the body when authorization key is incorrect', done => {
      request(app)
        .get('/example-authenticated')
        .set('Authorization', 'incorrect-key')
        .expect(res => {
          expect(res.body).toEqual(
            expect.objectContaining({
              error: 'Authorization is provided but not valid'
            })
          );
        })
        .end(done);
    });
  });
});

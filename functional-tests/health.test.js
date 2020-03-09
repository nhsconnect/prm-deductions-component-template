import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import { message } from '../src/api/health';
import config from '../src/config';

describe('/health', () => {
  it('health endpoint returns matching data', done => {
    const request = axios.get(`${config.url}/health`, { adapter });
    expect(request).resolves.toEqual(
      expect.objectContaining({
        data: expect.objectContaining(message)
      })
    );
    done();
  });
});

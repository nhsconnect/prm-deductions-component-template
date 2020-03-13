import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

describe('GET /example', () => {
  it('should return 200', async done => {
    const res = await axios.get(`${process.env.SERVICE_URL}/example`, { adapter });

    expect(res.status).toEqual(200);

    done();
  });
});

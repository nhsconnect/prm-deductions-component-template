import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

describe('GET /health', () => {
  it('should return matching data', async done => {
    const res = await axios.get(`${process.env.SERVICE_URL}/health`, { adapter });

    expect(res.data).toEqual(
      expect.objectContaining({
        version: '1.0.1',
        description: 'Health of Deduction PRM Component Template',
        status: 'running'
      })
    );
    done();
  });
});

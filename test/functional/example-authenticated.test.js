import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

describe('/example-authenticated', () => {
    it('should return 200 when authenticated correctly', async done => {
        const headers = {
          authorization: process.env.AUTHORIZATION_KEYS
        };

        const res = await axios.get(`${process.env.SERVICE_URL}/example-authenticated`,
            { headers, adapter });

        expect(res.status).toEqual(200);

        done();
    });
});

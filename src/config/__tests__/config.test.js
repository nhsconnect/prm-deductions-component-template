import { portNumber, initialiseConfig } from '../';

describe('config', () => {
  describe('NODE_ENV', () => {
    let nodeEnv;

    beforeEach(() => {
      nodeEnv = process.env.NODE_ENV;
      if (process.env.NODE_ENV) delete process.env.NODE_ENV;
    });

    afterEach(() => {
      // always leave environment in same state as before each test
      process.env.NODE_ENV = nodeEnv;
    });

    it('should get NODE_ENV = local when environment variable not defined', () => {
      expect(initialiseConfig().nodeEnv).toEqual('local');
    });

    it('should get NODE_ENV value is environment variable is set', () => {
      process.env.NODE_ENV = 'test';
      expect(initialiseConfig().nodeEnv).toEqual('test');
    });
  });

  describe('url', () => {
    let nhsEnvironment;

    beforeEach(() => {
      nhsEnvironment = process.env.NHS_ENVIRONMENT;
    });

    afterEach(() => {
      process.env.NHS_ENVIRONMENT = nhsEnvironment;
    });

    it('should return localhost when NHS_ENVIRONMENT is not set', () => {
      if (process.env.NHS_ENVIRONMENT) delete process.env.NHS_ENVIRONMENT;
      expect(initialiseConfig().url).toEqual(`http://127.0.0.1:${portNumber}`);
    });

    it('should return address when NHS_ENVIRONMENT is set to test', () => {
      process.env.NHS_ENVIRONMENT = 'test';
      expect(initialiseConfig().url).toEqual(
        `http://test.generic-component.patient-deductions.nhs.uk`
      );
    });

    it('should return address when NHS_ENVIRONMENT is set to dev', () => {
      process.env.NHS_ENVIRONMENT = 'dev';
      expect(initialiseConfig().url).toEqual(
        `http://dev.generic-component.patient-deductions.nhs.uk`
      );
    });
  });
});

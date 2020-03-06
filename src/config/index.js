const portNumber = 3000;

const initialiseConfig = () => ({
  nodeEnv: process.env.NODE_ENV || 'local',
  url: !process.env.NHS_ENVIRONMENT
    ? `http://127.0.0.1:${portNumber}`
    : `http://${process.env.NHS_ENVIRONMENT}.generic-component.patient-deductions.nhs.uk`
});

export default initialiseConfig();

export { portNumber, initialiseConfig };

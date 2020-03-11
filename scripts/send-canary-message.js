// Usage: node scripts/send-canary-message.js $(npm outdated --parseable)

const axios = require('axios');
const { getAllUpdates } = require('./parse-dependency-updates');

const options = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const body = {
  text: `Updates are available for the following packages for prm-deductions-component-template repo: ${JSON.stringify(
    getAllUpdates(process.argv),
    null,
    '\t'
  )}`
};

console.log('Sending message to NHS-PRM build failures Google Hangout group');

axios.post(process.env.GOOGLE_CHAT_CANARY_WEBHOOK, body, options);

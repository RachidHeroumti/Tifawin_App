// utils/config.js
const env = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set

let config :{
  'env':string,
 'token': {'clientId' :string,
  'clientSecret' :string,}
} ;

try {
  // Load the appropriate config file based on the environment
  switch (env) {
    case 'development':
      config = require('../config/development.json');
      break;
    case 'production':
      config = require('../config/production.json');
      break;
    default:
      config = require('../config/default.json');
      break;
  }
} catch (error) {
  console.error(`Failed to load config for environment: ${env}`, error);
  throw new Error(`Configuration file for environment "${env}" not found or invalid.`);
}

export default config;
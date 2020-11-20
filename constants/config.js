/* global window */






/**
 * Environments
 */
let env = 'development'; // Defaults to production


/**
 * Config object to export
 */
export default {
  // App Details
  appName: 'ReactStarterKit',

  // Build Configuration - eg. Debug or Release?
  isDevEnv: (env === 'development'),
  ENV: env,

  // Date Format
  dateFormat: 'Do MMM YYYY',

  // API
  apiBaseUrl: (env === 'production')
    ? 'https://digitalsupply.co/wp-json/wp'
    : 'http://165.227.34.172:3001/api/v1',



  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (env === 'production') ? 'UA-84284256-2' : 'UA-84284256-1',
};

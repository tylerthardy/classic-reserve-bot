const auth = require('./auth/auth');
const appScript = require('./app-script/app-script');

auth.authorize((auth) => {
  appScript.call(auth);
});
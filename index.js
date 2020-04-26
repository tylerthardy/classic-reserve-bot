const auth = require('./google/auth/auth');
const appScript = require('./google/app-script/app-script');

auth.authorize((auth) => {
  appScript.call(auth);
});
const auth = require('./google/auth/auth');
const raids = require('./raids/raids');


auth.authorize((auth) => {
    raids.create(auth, 'bwl', 'fake-bwl', 'fake bwl');
});
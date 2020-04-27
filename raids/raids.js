const bwl = require('./bwl');

function create(auth, raidSlug, title, description, callback) {
    switch(raidSlug) {
        case 'bwl':
            return bwl.create(auth, title, description, callback);
        default:
            throw 'Invalid raid slug';
    }
}

exports.create = create;
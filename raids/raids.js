const bwl = require('./bwl');

function create(auth, raidSlug, title, description) {
    switch(raidSlug) {
        case 'bwl':
            return bwl.create(auth, title, description);
        default:
            throw 'Invalid raid slug';
    }
}

exports.create = create;
const appScript = require('../google/app-script/app-script');
const request = require('request');

function create(auth, title, description) {
    const choices = [];
    request.get('https://raw.githubusercontent.com/Gephorian/wowstuff/master/loot-lists/bwl_loot.csv', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const lines = body.split('\n');
            lines.forEach((val, idx) => {
                if (idx === 0) return; //header

                const tokens = val.split('|');
                const item = tokens[0];
                choices.push(item);
            });
            appScript.call(auth, 'createReserveForm', [title, description, choices]);
        }
    });
}

exports.create = create;

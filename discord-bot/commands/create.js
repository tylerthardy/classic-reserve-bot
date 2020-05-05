const auth = require('../../google/auth');
const raids = require('../../raids/raids');

module.exports = {
    name: 'create',
    description: 'Create!',
    execute(input) {
        const msg = input.msg;
        const args = input.args;

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            throw 'You do not have permission to use this command';
        }

        msg.delete();
        if (args.length !== 3) {
            msg.channel.send('specify all arguments');
            return;
        }
        auth.authorize((auth) => {
            const raid = args[0];
            const title = args[1];
            const description = args[2];
            raids.create(auth, raid, title, description, (results) => {
                /*title: title,
                choices: choices,
                publishedUrl: form.getPublishedUrl(),
                editorUrl: form.getEditUrl(),
                spreadsheetUrl: spreadsheet.getUrl()*/
                msg.channel.send(`Reserve form for ${title}:`);
                msg.channel.send(results.publishedUrl);
                msg.channel.send(`Responses for ${title}:`);
                msg.channel.send(results.spreadsheetUrl);
            });
        });        
    },
};
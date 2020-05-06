const auth = require('../../google/auth');
const raids = require('../../raids/raids');
const db = require('../../db');

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
            msg.channel.send('Usage: !create <raid> <title> <description>');
            return;
        }

        db.query('Guild', {id: msg.guild.id}, (err, guilds) => {
            // error
            if (err) {
                throw err;
            }
            // not found

            if (guilds.length === 0) {
                msg.channel.send('You need to authorize classic-reserve-bot to create google forms on your behalf: ' + auth.authUrl);
                msg.channel.send(msg.guild.id);
                return;
            }

            // found
            const guild = guilds[0];
            auth.authorizeUser(guild.credentials, () => {
                const raid = args[0];
                const title = args[1];
                const description = args[2];
                raids.create(auth.client, raid, title, description, (results) => {
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
        });
    },
};
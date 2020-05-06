const db = require('../../db');

module.exports = function (bot, msg) {
    if (!msg.content.startsWith('!')) {
        return;
    }
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase().replace('!', '');
    console.info(`Called command: ${command}`);
    
    if (!bot.commands.has(command)) return;
    
    try {
        const cmd = bot.commands.get(command);
        cmd.execute({
            msg: msg,
            bot: bot,
            db: db,
            args: args
        });
    } catch (error) {
        const message = error.message ? error.message : error;
        msg.reply('There was an error trying to execute that command:\n' + message);
    }
}
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
        if (cmd.needsClient) {
            cmd.execute(msg, bot, args);
        } else {
            cmd.execute(msg, args);
        }
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
}
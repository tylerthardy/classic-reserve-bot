module.exports = {
    name: 'servers',
    description: 'Servers',
    needsClient: true,
    execute(msg, bot, args) {
        bot.guilds.cache.forEach((guild) => {
            msg.reply(guild.name);
        });
    },
};
module.exports = {
    name: 'servers',
    description: 'Servers',
    execute(input) {
        const msg = input.msg;
        const bot = input.bot;
        if (msg.member.user.id !== '92409005023965184') {
            throw 'You do not have permission to use this command';
        }
        bot.guilds.cache.forEach((guild) => {
            msg.reply(guild.name);
        });
    },
};
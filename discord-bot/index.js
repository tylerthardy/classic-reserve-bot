const Discord = require('discord.js');
const botCommands = require('./commands');
const handlers = require('./handlers');

const TOKEN = process.env.TOKEN;
const bot = new Discord.Client();

function initialize(callback) {
    bot.commands = new Discord.Collection();
    Object.keys(botCommands).map(key => {
        bot.commands.set(botCommands[key].name, botCommands[key]);
    });

    bot.on('ready', () => callback(bot));
    bot.on('message', msg => handlers.message(bot, db, msg));

    bot.login(TOKEN);
}

module.exports = {
    initialize: initialize,
    bot: bot
};
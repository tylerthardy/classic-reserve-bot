require('dotenv').config();
const discord = require('./discord-bot');

discord.initialize(() => {
  console.info(`Logged in as ${discord.bot.user.tag}!`);
});
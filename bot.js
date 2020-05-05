require('dotenv').config();
const discord = require('./discord-bot');
const db = require('./db');

db.connect(
  callback = () => {
    discord.initialize(() => {
      console.info(`Logged in as ${discord.bot.user.tag}!`);
    });
  },

  err = () => {
    console.error.log(console, 'mongodb connection error')
  }
)

require('dotenv').config();
const discord = require('./discord-bot');
const googleAuth = require('./google/auth');
const db = require('./db');

db.connect(() => {
  console.info(`Connected to mongodb: ${db.connection.name} (${db.connection.host})` ); // todo: flesh out string

  googleAuth.initialize(() => {
    console.info(`Connected to Google auth: ` + googleAuth.client._clientId); // todo: flesh out any relevant

    discord.initialize(() => {
      console.info(`Connected to Discord: Logged in as ${discord.bot.user.tag}!`);

      // do anything else
    });
  });
});

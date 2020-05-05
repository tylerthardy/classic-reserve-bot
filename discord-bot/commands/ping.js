module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(input) {
        const msg = input.msg;
        const args = input.args;
        msg.reply('pong');
        msg.channel.send('pong');
    },
};
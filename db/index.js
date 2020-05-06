const mongoose = require('mongoose');
const schemas = require('./schemas');

const schema = {};

function connect(callback) {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
    mongoose.connection.on('error', () => console.error.log(console, 'mongodb connection error'));
    mongoose.connection.once('open', () => {
        initializeSchemas();
        callback();
    })
}

function initializeSchemas() {
    schema.Guild = mongoose.model('Guild', new mongoose.Schema(schemas.guild, {collection: 'Guild'}));
}

module.exports = {
    connect: connect,
    connection: mongoose.connection,
    schema: schema
}
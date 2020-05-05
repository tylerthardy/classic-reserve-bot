const mongoose = require('mongoose');
const schemas = require('./schemas');

const schema = {};

function connect(callback, err) {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
    mongoose.connection.on('error', err);
    mongoose.connection.once('open', () => {
        initializeSchemas();
        callback();
    })
}

function initializeSchemas() {
    schema.Guild = mongoose.model('Guild', new mongoose.Schema(schemas.guild));
}

module.exports = {
    connect: connect,
    schema: schema
}
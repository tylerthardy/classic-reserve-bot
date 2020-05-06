const mongoose = require('mongoose');
const schemas = require('../schemas');

const schema = {};

function connect(callback) {
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
    mongoose.connection.on('error', () => console.error.log(console, 'mongodb connection error'));
    mongoose.connection.once('open', () => {
        initializeSchemas();
        callback();
    })
}

function initializeSchemas() {
    schema.Guild = mongoose.model('Guild', new mongoose.Schema(schemas.guild, {collection: 'Guild'}));
}

function query(table, queryObject, callback) {
    return schema[table].find(queryObject, callback);
}

module.exports = {
    connect: connect,
    connection: mongoose.connection,
    schema: schema,
    query: query
}
const mysql = require('mysql');
const schemas = require('../schemas');

const schema = {};

function connect(callback) {
    var con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        initializeSchemas();
        callback();
    });
}

function initializeSchemas() {
    schema.Guild = mongoose.model('Guild', new mongoose.Schema(schemas.guild, {collection: 'Guild'}));
}

function query(table, queryObject, callback) {
    let wheres = [];
    for (let prop in queryObject) {
        if (!queryObject.hasOwnProperty(prop)) {
            continue;
        }
        wheres.push({key: prop, value: queryObject[prop]})
    }

    let sql = 'SELECT * FROM ?';
    params.push(table);

    sql += 'WHERE 1=1';
    if (wheres.length > 0) {
        let params = [];
        for (var i in wheres) {
            sql += '\nAND ? = ?';
            params.push(wheres[i].key, wheres[i].value);
        }
    }

    return con.query(sql, params,  (error, results, fields) => {
        const test = results;
        callback(error, results);
    });
}

module.exports = {
    connect: connect,
    connection: mongoose.connection,
    schema: schema,
    query: query
}
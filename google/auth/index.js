const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/spreadsheets',
    'email',
    'profile',
    'openid'
];
const TOKEN_PATH = 'token.json';

function initialize(callback) {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Apps Script API.
        this.client = authorizeClient(JSON.parse(content));
        this.authUrl = this.client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        callback();
    });
}

function authorizeClient(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    return client;
}

function authorizeUser(userCreds, callback) {
    this.client.setCredentials(userCreds);
    callback();
}

function getAccessCode(callback) {
    console.log('Authorize this app by visiting this url:', this.authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        getToken(code, callback);
    });
}

function getToken(code, callback) {
    this.client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);

        this.client.setCredentials(token);

        if (process.env.DEBUG) {
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
        }
        callback();
    });
}

module.exports = {
    client: null,
    authUrl: null,
    initialize: initialize,
    authorizeUser: authorizeUser,
    getAccessCode: getAccessCode
}

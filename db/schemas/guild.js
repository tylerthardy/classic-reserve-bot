module.exports = {
    id: String,
    name: String,
    credentials: {
        access_token: String,
        refresh_token: String,
        scope: String,
        token_type: String,
        id_token: String,
        expiry_date: String
    }
};
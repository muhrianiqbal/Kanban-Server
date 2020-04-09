const jwt = require('jsonwebtoken');

function generateToken(data)
{
    return jwt.sign(data, process.env.Token);
}

function verify(token)
{
    return jwt.verify(token, process.env.Token);
}

module.exports = {generateToken, verify};
const  dotenv = require("dotenv");

dotenv.config();

const defaultConfig = {
    port: 5000,
    dbUri: "mongodb://localhost:27017/crowdfunding",
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
    refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY
}

module.exports = defaultConfig;
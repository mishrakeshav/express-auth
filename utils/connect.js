const mongoose = require("mongoose");
const config = require("config");
const loggger = require("./logger.js");

const connect = async ()=>{
    const dbUri = config.get("dbUri");
    try{
        await mongoose.connect(dbUri);
        loggger.info("DB CONNECTED")
    }catch(error){
        loggger.error("Could not connect to DB");
        process.exit(1);
    }
}

module.exports = connect;
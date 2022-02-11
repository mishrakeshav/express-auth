const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/default");


const userSchema = new mongoose.Schema({
    email : { type : String, required : true, unique : true},
    name : { type : String, required : true},
    password : { type : String, required : true},
    // authorizer, admin, superadmin
    role : {type : String, default : "authorizer"}
}, {timestamps : true});


userSchema.pre("save", async function (next){
    let user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(config?.saltWorkFactor);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

userSchema.methods.comparePassword = async function(candidatePassword){
    let user = this;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

module.exports = mongoose.model('User', userSchema);
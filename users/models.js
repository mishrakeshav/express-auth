const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const saltRounds = 10;


const userSchema = mongoose.Schema({
    firstName : { type : String, required : true },
    lastName : { type : String, required : true },
    email : { type : String, required : true },
    password : { type : String, required : true, minlength:6},
}, {timestamps : true});

userSchema.pre('save', async function( next ){
    let user = this;
    if(user.isModified('password')){    
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
            user.password = hash;
            next();
        });
    } else {
        next()
    }
});

userSchema.methods.comparePassword = async function(plainPassword){
    const result =  await bcrypt.compare(plainPassword, user.password);
    return result;
}

module.exports =  mongoose.model('User',userSchema);
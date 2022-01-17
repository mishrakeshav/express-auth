const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : false
    }, 
    token : {
        type : String,
        required : true
    },
    expired : {
        type : Boolean,
        default : false
    }
}, {timestamps : true});



userSchema.methods.checkSession = async (userId,token)=>{

}

userSchema.methods.createSession = async (userId) => {
    //const token = jwt.sign({ email : user.email, id : user._id} , TOKEN_SECRET, {expiresIn : EXPIRES_IN});
}

module.exports =  mongoose.model('Session',sessionSchema);
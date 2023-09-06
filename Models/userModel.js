const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    username:{
        type:String, 
        required:[true, "Please enter a user name."]
    }, 
    email:{
        type:String, 
        required:[true, "Please enter a email."],
        unique:[true, "Please enter a unique email address"]
    }, 
    password:{
        type:String, 
        required:[true, "Please enter a password."]
    }
}, 
{
    timestamps:true
});

module.exports=mongoose.model("user", UserSchema);
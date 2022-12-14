const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        // default:"NOT_MENTIONED",
    },
    EID:{
        type:String,
        // default:"NOT_ASSIGNED",
    },
    userEmail:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },
    password:{
        type:String,
        required:true,
    },
    // reviewsToGive:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Review",
    //     }
    // ]
},{timestamps:true});

const User= mongoose.model("User",userSchema);
module.exports=User;
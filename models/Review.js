const mongoose = require("mongoose");

const reviewSchema=mongoose.Schema({
 reviewer:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
 },
 reviewee:{
    type:mongoose.Schema.Types.ObjectId,
    required:true, 
 },
 review:{
    type:Number,

 },
 isSubmitted:{
    type:Boolean,
    default:false,
 }
});

const Review= mongoose.model("Review",reviewSchema);
module.exports=Review;
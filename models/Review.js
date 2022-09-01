const mongoose = require("mongoose");

const reviewSchema=mongoose.Schema({
 reviewer:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
 },
 reviewee:{
    type:mongoose.Schema.Types.ObjectId,
    required:true, 
    ref:"User",
 },
 review:{
    type:Number,

 },
 reviewstring:{
   type:String,
 },
 isSubmitted:{
    type:Boolean,
    default:false,
 }
},{timestamps:true});

const Review= mongoose.model("Review",reviewSchema);
module.exports=Review;
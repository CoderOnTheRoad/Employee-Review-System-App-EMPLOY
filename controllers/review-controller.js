const Review = require("../models/Review");

module.exports.createReview=async function(req,res){
    // console.log("hi");
    // console.log(req.body);
    try{
        const review=await Review.findOne({reviewer:req.body.reviewer,reviewee:req.body.reviewee,isSubmitted:false});
        if(!review){
            const newReview= await Review.create({
                reviewee:req.body.reviewee,
                reviewer:req.body.reviewer,
            });
            if(newReview){
                console.log("review created");
            }
            
        }
        return res.redirect("back");

    }catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.submitReview=async function(req,res){
    // console.log("hi");
    // console.log(req.body);
    Review.findOneAndUpdate({_id:req.params.id,isSubmitted:false},{review:req.body.review,isSubmitted:true},(err,review)=>{
        if(err){
            console.log("error in finding review");
            return;
        }
        if(!review){
            console.log("no such review with this id exists");
            return res.redirect("back");     
        }
        return res.redirect("back");
    })

}
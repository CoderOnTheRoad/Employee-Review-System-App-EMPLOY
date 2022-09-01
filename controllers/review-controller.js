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
                // console.log("review created");
                req.flash("success","Review Task Successfuly Created");
                // console.log(req);
                return res.redirect("back");
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
    Review.findOneAndUpdate({_id:req.params.id,isSubmitted:false},{review:req.body.review,reviewstring:req.body.reviewstring,isSubmitted:true},(err,review)=>{
        if(err){
            //console.log("error in finding review");
            req.flash("error","cant find the clicked review, try again!");
            // console.log(req);
            return res.redirect("back");
        }
        if(!review){
            req.flash("error","cant find the clicked review, try again!");
            // console.log(req);
            return res.redirect("back");
            // return res.redirect("back");     
        }
        req.flash("success","Review Submitted Successfuly");
        return res.redirect("back");
    })

}
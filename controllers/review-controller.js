const Review = require("../models/Review");

module.exports.createReview=function(req,res){
    console.log("hi");
    console.log(req.body);
    Review.find({reviewee:req.body.reviewee,reviewer:req.body.reviewer,isSubmitted:false},function(err,review){
        if(err){
            console.log("cant create review please try again");
            return;
        }
        // console.log(review);
        if(!review){
            Review.create({
                reviewee:req.body.reviewee,
                reviewer:req.body.reviewer,
            },function(err,review){
                if(err){
                    console.log("error in creating review");
                    return;
                }
                console.log("review created");
                return res.redirect("/");
            })
        }
        return res.redirect("back");
    })
}
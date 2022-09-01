const Review = require("../models/Review");

module.exports.home=(req,res)=>{
    if(req.isAuthenticated()==false){
        // console.log(req.flash("success"));
        // console.log(req);
       return res.render("home.ejs");
    }
    return res.redirect(`/user/profile/${req.user.id}`);
}
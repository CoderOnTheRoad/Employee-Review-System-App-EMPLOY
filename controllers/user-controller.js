const User = require("../models/User");
const Review=require("../models/Review");
const passport=require("passport");
module.exports.signUp=function(req,res){
    console.log(req.body);
    User.findOne({userEmail:req.body.email},function(err,user){
        if(err){
            console.log("ERROR in creating user:",err)
        }
        if(!user){
            User.create({
                userEmail:req.body.email,
                password:req.body.password,
            },function(err,user){
                if(err){
                    console.log("cannot create user try again");
                    return;
                }
                console.log("user created");
                return res.redirect("/");
            })
        }
    });
}
module.exports.signIn=function(req,res){
    return res.redirect(`/user/profile/${req.user.id}`)
}
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log("cant find user",err);
            return res.redirect("/");
        }
        if(user.isAdmin==false){
            Review.find({reviwer:user.id,isSubmitted:false,},function(err,reviews){
                // console.log(reviews);
                return res.render("employee_profile.ejs",{title:" admin profile page",userEmail:user.userEmail,isAdmin:user.isAdmin,reviewsToDo:reviews,layout:"employee_layout"});
            })
            
        }else{
            const users = User.find(function(err,users){
                console.log(users);
                return res.render("admin_profile.ejs",{title:" employee profile page",userEmail:user.userEmail,isAdmin:user.isAdmin,users:users,layout:"admin_layout"});
            }).select("-password");

            
        }
    })
}
module.exports.logoutSession=function(req,res){
    req.logout(function(err){
        if(err){
            console.log("cant log out");
            return;
        }
    });
    return res.redirect("/");
}
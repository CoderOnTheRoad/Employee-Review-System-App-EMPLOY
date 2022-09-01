const User = require("../models/User");
const Review=require("../models/Review");
const passport=require("passport");
module.exports.signUp=function(req,res){
    console.log(req.body);
    User.findOne({userEmail:req.body.email},function(err,user){
        if(err){
            // console.log("ERROR in creating user:",err)
            req.flash("error","ERROR in creating user");
            return res.redirect("back");
        }
        if(!user){
            User.create({
                userEmail:req.body.email,
                password:req.body.password,
            },function(err,user){
                if(err){
                    // console.log("cannot create user try again");
                    req.flash("error","can not create user try again!")
                    return res.redirect("back");
                }
                req.flash("success","user created");
                //console.log(res);
                // console.log("user created");
                return res.redirect("/");
            })
        }else{
            req.flash("error","User with same email already exists!");
            return res.redirect("back");
        }
    });
}
module.exports.signIn=function(req,res){
    return res.redirect(`/user/profile/${req.user.id}`)
}
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            // console.log("cant find user",err);
            req.flash("error","cant find user")
            return res.redirect("back");
        }
        if(user.isAdmin==false){

            return res.render("employee_profile.ejs",{title:" employee profile page",userEmail:user.userEmail,isAdmin:user.isAdmin,EID:user.EID,userName:user.userName,layout:"employee_layout"});
            
        }else{

            return res.render("admin_profile.ejs",{title:" admin profile page",userEmail:user.userEmail,isAdmin:user.isAdmin,EID:user.EID,userName:user.userName,layout:"admin_layout"});

            
        }
    })
}
module.exports.logoutSession=function(req,res){
    req.logout(function(err){
        if(err){
            req.flash("error","cant log out")
            return res.redirect("back");
        }
        req.flash("success","logged out successfuly!")
        return res.redirect("/");
    });

}
module.exports.taskView=async function(req,res){
    const reviews=await Review.find({reviewer:req.params.id,isSubmitted:false}).populate("reviewee");
    // console.log(reviews);
    if(req.user.isAdmin==false){
        return res.render("_user_task_view.ejs",{title:"task view page",reviewsToDo:reviews,layout:"employee_layout"});
    }else{
        return res.render("_user_task_view.ejs",{title:"task view page",reviewsToDo:reviews,layout:"admin_layout"});
    }
}

const User = require("../models/User");
const Review=require("../models/Review");
module.exports.viewEmployees= async function(req,res){
    const users = await User.find().select("-password");
    if(!users){
        console.log("cant find employees");
        return res.redirect("back");
    }
    return res.render("_admin_employee_view.ejs",{employees:users,layout:"admin_layout"});

}
module.exports.updateEmployee= async function(req,res){
    const userAccordingToFormData= await User.findOne({userEmail:req.body.userEmail});
    const userId=req.params.id;

    if(userAccordingToFormData.id==userId || !userAccordingToFormData){

        const user= await User.findByIdAndUpdate(userId,{userName:req.body.userName,EID:req.body.EID,userEmail:req.body.userEmail,isAdmin:req.body.isAdmin});
        if(!user){
            // console.log("cant find the user");
            req.flash("error","cant find the user, try again!");
            return res.redirect("back");
        }
        req.flash("success","Employee details updated");
        return res.redirect("/admin/view-employees");
    }else{
        // console.log("Another User with Same Email exists");
        req.flash("error","Another User with Same Email exists");
        return res.redirect("back");
    }
}
module.exports.createTask=function(req,res){
    const users = User.find(function(err,users){
        // console.log(users);
        return res.render("admin_create_task.ejs",{title:"create review task page",users:users,layout:"admin_layout"});
    }).select("-password");
}
module.exports.deleteEmployee=async (req,res)=>{
    try{

        const user=await User.findById(req.params.id);
        const reviews=await Review.deleteMany({reviewer:user.id});
        await Review.deleteMany({reviewee:user.id});
        await User.findByIdAndDelete(req.params.id);
        req.flash("success","Employee Details Deleted");
        return res.redirect("back");

    }catch(err){
        req.flash("error","Error in deleting employee");
        // console.log(err);
        return res.redirect("back");
    }
}

module.exports.showAllReviews=async (req,res)=>{
    try{
        // const user=await User.findById(req.params.id);
        const reviews=await Review.find().populate("reviewer").populate("reviewee");
        // await User.findByIdAndDelete(req.params.id);
        return res.render("admin_all_reviews.ejs",{reviews:reviews,layout:"admin_layout.ejs"});

    }catch(err){
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.updateReview= async function(req,res){
    try{
        const reviewId=req.params.id;
        const review= await Review.findByIdAndUpdate(reviewId,{review:req.body.review,reviewstring:req.body.reviewstring,});
        req.flash("success","Review Has Been Successfuly Updated");
        return res.redirect("back");

    }catch(err){
        req.flash("error","Error In Updating Review");
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.getAllEmployeesApi= async function(req,res){

    try{
        const users = await User.find().select("-password");
        if(!users){
            // console.log("cant find employees");
            return res.redirect("back");
        }
        return res.status(200).json({data:users});

    }catch(err){
        console.log(err);
        return res.status(400);
    }
}

module.exports.addEmployeePage= async function(req,res){
    try{
        return res.render("_admin_addemployee.ejs",{title:"add user page",layout:"admin_layout"});

    }catch(err){
        console.log(err);
        return res.status(400);
    }
}
module.exports.addNewEmployee=async function(req,res){
    try{
       const user=await User.findOne({userEmail:req.body.userEmail});
       if(!user){
        await User.create({
            userName:req.body.userName,
            userEmail:req.body.userEmail,
            EID:req.body.EID,
            password:req.body.password,
            isAdmin:req.body.isAdmin,
        });
        req.flash("success","user created successfuly");
        // console.log("user created successfuly")
       }else{
        // console.log("user already exist");
        req.flash("error","user already exist");
    
       }
       res.redirect("back");

    }catch(err){
        // console.log(err);
        req.flash("error","Cant create this user");
        return res.redirect("back");
    } 
}

module.exports.deleteReview=async (req,res)=>{
    try{
        const user=await Review.findByIdAndDelete(req.params.id);
        // const reviews=await Review.deleteMany({reviewer:user.id});
        // await User.findByIdAndDelete(req.params.id);
        req.flash("success","review deleted")
        return res.redirect("back");

    }catch(err){
        req.flash("error","Error in deleting Review");
        // console.log(err);
        return res.redirect("back");
    }
}
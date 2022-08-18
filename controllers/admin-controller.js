const User = require("../models/User");
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
            console.log("cant find the user");
            return res.redirect("back");
        }
        return res.redirect("/admin/view-employees");
    }else{
        console.log("Another User with Same Email exists");
        return res.redirect("back");
    }
}
module.exports.createTask=function(req,res){
    const users = User.find(function(err,users){
        // console.log(users);
        return res.render("admin_create_task.ejs",{title:"create review task page",users:users,layout:"admin_layout"});
    }).select("-password");
}
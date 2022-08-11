const express= require("express");
const router= express.Router();
const passport=require("passport");
const userController=require("../controllers/user-controller")
router.post("/signUp",userController.signUp);
router.post("/signIn",passport.authenticate("local",{failureRedirect:"/"}),userController.signIn);
router.get("/profile/:id",passport.checkAuthentication,userController.profile);
router.get("/logout",userController.logoutSession);
module.exports=router;
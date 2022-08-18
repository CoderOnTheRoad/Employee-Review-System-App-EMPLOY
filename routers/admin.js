const express= require("express");
const router= express.Router();
const passport=require("passport");
const localStrategy=require("../config/passport-local");
const adminController=require("../controllers/admin-controller");
const reviewController=require("../controllers/review-controller");
router.get("/view-employees",passport.checkAuthenticationAdmin,adminController.viewEmployees);
router.post("/user/update/:id",passport.checkAuthenticationAdmin,adminController.updateEmployee);
router.get("/getallemployees",passport.checkAuthenticationAdmin,adminController.createTask);
router.post("/create-task",passport.checkAuthenticationAdmin,reviewController.createReview);

module.exports=router;
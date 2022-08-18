const express= require("express");
const router= express.Router();
const passport=require("passport");
const reviewController=require("../controllers/review-controller");
// router.post("/create",reviewController.createReview);
router.post("/submit/:id",passport.checkAuthentication,reviewController.submitReview);
module.exports=router;
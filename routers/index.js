const express= require("express");
const router= express.Router();
const homeController= require("../controllers/home-controller")
router.get("/", homeController.home)
router.use("/user",require("./user.js"));
router.use("/review",require("./review.js"));
router.use("/admin",require("./admin.js"));
// router.post("/print",function(req,res){
//     console.log(req.body);
//     res.redirect("/");
// })
module.exports=router;
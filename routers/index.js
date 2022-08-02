const express= require("express");
const router= express.Router();

router.get("/",(req,res)=>{
    res.render("home.ejs");
})
router.post("/print",function(req,res){
    console.log(req.body);
    res.redirect("/");
})
module.exports=router;
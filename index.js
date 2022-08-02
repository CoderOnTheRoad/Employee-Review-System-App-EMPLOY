const { urlencoded } = require("express");
const express = require("express");
const app=express();
const port = 3000;
const expressEjsLayout= require("express-ejs-layouts");
app.set("view engine","ejs");
app.set("views","./views");
app.use(expressEjsLayout);
app.set("layout extractStyles",true);//extracts all the variables page's stylesheet in the head of the layout
app.set("layout extractScripts",true)//extracts all the variables page's Javascipts  in the end of the body  of the layout
app.use(urlencoded({extended:false}));
app.use("/",require("./routers"));


app.listen(port,(err)=>{
  if(err){
    console.log("error in starting the app");
  }else{
    console.log("app is successfuly running on Port:",port);
  }
})
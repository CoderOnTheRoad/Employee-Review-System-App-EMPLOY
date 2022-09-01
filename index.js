const { urlencoded } = require("express");
const flash=require("connect-flash");
const express = require("express");
const app=express();
const port = 8000;
const passport=require("passport");
const passportLocal=require("./config/passport-local");
const expressEjsLayout= require("express-ejs-layouts");
const cookieParser=require("cookie-parser");
const session= require("express-session");
const MongoStore=require("connect-mongo");
const db=require("./config/mongoose");

const customMware=require("./config/flashMiddleware");
app.use(session({
    secret: "secretERS",
    saveUninitialized:true,
    cookie: { maxAge:(1000*60*100) },
    resave: false,
    store:MongoStore.create({
      mongoUrl:"mongodb://localhost/ERS",
      autoRemove: "disabled",
    },
    function(err){
        console.log(err||"connect-mongoDB setup ok"); // (it is a new way of writing in console.log) if there is error it will show error or if there is no error it will show "connect-mongoDB setup ok"
    }
  ),
}));

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("./assets"));
app.use(expressEjsLayout);
app.set("layout extractStyles",true);//extracts all the variables page's stylesheet in the head of the layout
app.set("layout extractScripts",true)//extracts all the variables page's Javascipts  in the end of the body  of the layout
app.use(cookieParser());
app.use(urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());
//whenever app is running this mmiddleware will check if there is a session cookie or not and it will pass the user details to the respose locals
app.use(passport.setAuthenticatedUser);
//flash messages 
app.use(flash());
app.use(customMware.setFlash);


app.use("/",require("./routers"));


app.listen(port,(err)=>{
  if(err){
    console.log("error in starting the app");
  }else{
    console.log("app is successfuly running on Port:",port);
  }
})
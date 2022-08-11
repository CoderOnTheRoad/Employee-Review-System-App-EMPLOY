const passport= require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("../models/User");

passport.use(new LocalStrategy({
    usernameField:"email", //setting up the username field
    //the below line is used to pass reqest to the callback function so that we can pass flash message to request
    passReqToCallback:true, //passing request to callback so that we can set up flash message 
    //previously the callback function was function(email,password,done){}
    //but now we can use function(req,email,password,done){}
},
function(req,email,password,done){ //done is the callback function
    User.findOne({userEmail:email},function(err,user){
        if(err){
            // req.flash("error",err);
            return done(err);//done function takes two arguments reeor and true/false(it says authentication is true or false means there is such user or not);
        }
        if(!user||user.password!=password){
            // req.flash("success","Invalid username/password");
            return done(null,false);// means the error is null and the authentication is false that means there is a user
        }
        return done(null,user);
    });
}
));

//serializing the user to decide which key is to be kept inside cookies //serializer encrypts the value of cookies 
passport.serializeUser(function(user,done){
    done(null,user.id)//pass the user id to cookies
});

// deserialize the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in Finding user --> Passport");
            return done(err);
        }
        return done(null,user);
    });
});

//check if the user is authenticated
//it will be used as middleware as it is taking reqest response and next as input 
//passport puts a method on req called is Authenticated we will use it here.
passport.checkAuthentication= function(req,res,next){
    //if the user is signed in the in then pass on the request to the callback function named next here next will pass the job to controller's action
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in 
    return res.rediret("/user/signIn");
}

//middleware to check user is signed in or not 
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current user but it is not is response 
        //req.user contains the current sined in user from the session cookie and we are just sending it to the locals for the views
        res.locals.user=req.user;

    }
    next();
}


module.exports=passport;
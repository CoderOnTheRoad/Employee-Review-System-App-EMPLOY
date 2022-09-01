module.exports.setFlash=function(req,res,next){
    //till now the flash is stored in req.flash I have to store it in res.locals
    console.log(req.flash);
    res.locals.flash={
        "success":req.flash("success"),
        "error":req.flash("error"),
    }
    next();
}
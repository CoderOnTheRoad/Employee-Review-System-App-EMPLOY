const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://127.0.0.1/ERS");
db=mongoose.connection;
db.on("error",console.error.bind(console,"Cant connect to database"));
db.once("open",function(){console.log("Successfuly connected to database");});
module.exports=db;

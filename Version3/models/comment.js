var mongoose=require("mongoose");

//SCHEMA SETUP
var commentSchema=new mongoose.Schema({
  text: String,
  author:String
});
//MODEL SRTUP
module.exports=mongoose.model("Comment",commentSchema);
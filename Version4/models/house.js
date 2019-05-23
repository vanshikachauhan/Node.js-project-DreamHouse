
 var mongoose=require("mongoose");

//SCHEMA SETUP
var houseSchema=new mongoose.Schema({
  name: String,
  image:String,
  description:String,
  comments:[
  {
  	type:mongoose.Schema.Types.ObjectId,
  	ref:"Comment"
  }]
});
//MODEL SRTUP
module.exports=mongoose.model("House",houseSchema);
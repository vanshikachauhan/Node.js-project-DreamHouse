//Setting up variables.
var express    =require("express"),
    app        =express(),
    bodyParser = require("body-parser"),
    mongoose   =require("mongoose"),
    House      =require("./models/house"),
    seedDB     =require("./seeds"),
    Comment    =require("./models/comment");

mongoose.connect("mongodb://localhost/dream-house");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");    

//seeds file called
seedDB();
//Initial route setup.
app.get("/",function(req,res){
	res.render("landing");
});
//route for houses.
app.get("/houses",function(req,res){
	House.find({},function(err,allHouses){
		if(err){
			console.log(err);
		}
	 else{
		res.render("index",{houses:allHouses});
		
   }
})
});	
//posting route
app.post("/houses",function(req, res){
	
	  var name= req.body.name;
	  var image= req.body.image;
	  var desc= req.body.description;
	  var newHouses={name: name, image: image,description:desc};
	  House.create(newHouses,function(err,house){
	    if(err){
	      console.log(err);
	    } else {
	      
	      console.log(house);
	      res.redirect("index");
	    }
	  });
 });
//route for creating new dream houses.
app.get("new",function(req, res){
	
  res.render("new");
});



app.get("/houses/:id",function(req,res){
	House.findById(req.params.id).populate("comments").exec(function(err,foundHouse){
   if(err){
     console.log(err);

   }else{
   	  console.log(foundHouse);
      res.render("show",{house:foundHouse});
    }
  });

})


//Port number is assigned.
app.listen(1000,function(){
	console.log("YelpCamp server started!!!!!");
});

 
//Setting up variables.
var express    =require("express"),
    app        =express(),
    bodyParser = require("body-parser"),
    mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/dream-house");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//SCHEMA SETUP
var houseSchema=new mongoose.Schema({
  name: String,
  image:String,
  description:String
});
//MODEL SRTUP
var House =mongoose.model("House",houseSchema);

//CREATING HOUSE
// House.create(
// 	 { name:"SNOW HOUSE",
// 	   image:"https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	   description:"Landscape photo of 2-storey house"
//      },function(err,house){
//      if(err){
//       console.log(err);
//      } else {
//       console.log("NEWLY CREATED HOUSE");
//       console.log(house);
//      }});
// var houses=[{name:"SNOW HOUSE",image:"https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",description:"Landscape photo of 2-storey house"},
// {name:"WHITE HOUSE",image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",description:"White and grey concrete building near swimming pool under clear sky during daytime"},
// {name:"WOODEN MOUNTAIN HOUSE",image:"https://images.unsplash.com/photo-1519302959554-a75be0afc82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",description:"Yellow wooden house near mountain during cloudy day"}
// ]    


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
	      res.redirect("houses");
	    }
	  });
 });
//route for creating new dream houses.
app.get("/houses/new",function(req, res){
	
  res.render("new");
});



app.get("/houses/:id",function(req,res){
	House.findById(req.params.id,function(err,foundHouse){
   if(err){
     console.log(err);

   }else{
      res.render("show",{house:foundHouse});
    }
  })
});
//Port number is assigned.
app.listen(1000,function(){
	console.log("YelpCamp server started!!!!!");
});

 
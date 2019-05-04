//Setting up variables.
var express    =require("express"),
    app        =express(),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var houses=[{name:"SNOW HOUSE",image:"https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",description:"Landscape photo of 2-storey house"},
{name:"WHITE HOUSE",image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",description:"White and grey concrete building near swimming pool under clear sky during daytime"},
{name:"WOODEN MOUNTAIN HOUSE",image:"https://images.unsplash.com/photo-1519302959554-a75be0afc82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",description:"Yellow wooden house near mountain during cloudy day"}
]    


//Initial route setup.
app.get("/",function(req,res){
	res.render("landing");
})
//route for houses.
app.get("/houses",function(req,res){
	res.render("index",{houses:houses});
})
//posting route
app.post("/houses",function(req, res){
	
  var name= req.body.name;
  var image= req.body.image;
  var newHouses={name: name, image: image};
  houses.push(newHouses);
  res.redirect("houses");
});
//route for creating new dream houses.
app.get("/houses/new",function(req, res){
	
  res.render("new");
});
//Port number is assigned.
app.listen(1000,function(){
	console.log("YelpCamp server started!!!!!");
});
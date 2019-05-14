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
		res.render("houses/index",{houses:allHouses});
		
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
	      res.redirect("houses/index");
	    }
	  });
 });
//route for creating new dream houses.
app.get("/houses/new",function(req, res){
	
  res.render("houses/new");
});



app.get("/houses/:id",function(req,res){
	House.findById(req.params.id).populate("comments").exec(function(err,foundHouse){
   if(err){
     console.log(err);

   }else{
   	  console.log(foundHouse);
      res.render("houses/show",{house:foundHouse});
    }
  });

});
//==================
//COMMENTS ROUTES
//==================

app.get("/houses/:id/comments/new",function(req,res){
	//find house by id
	House.findById(req.params.id,function(err,house){
		if(err){
			console.log(err);

		}else {
			res.render("comments/new",{house:house});
		}
	})
})

app.post("/houses/:id/comments",function(req,res){
	//find house by id
	House.findById(req.params.id,function(err,house){
		if(err){
			console.log(err);

		}else {
			Comment.create(req.body.comment,function(err, comment){
                if(err){
			console.log(err);

		}else {
			  house.comments.push(comment);
			  house.save();
			  res.redirect('/houses/'+house._id);

			
		}
	})
	}

})
})


//Port number is assigned.
app.listen(1000,function(){
	console.log("YelpCamp server started!!!!!");
});

 
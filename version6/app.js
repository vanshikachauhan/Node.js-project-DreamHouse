//Setting up variables.
var express            =require("express"),
    app                =express(),
    bodyParser         = require("body-parser"),
    mongoose           =require("mongoose"),
    House              =require("./models/house"),
    seedDB             =require("./seeds"),
    Comment            =require("./models/comment"),
    passport           =require("passport"),
    LocalStratergy     =require("passport-local"),
    User               =require("./models/user");

mongoose.connect("mongodb://localhost/dream-house");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");    
app.use(express.static(__dirname + "/public"));
 
//PASSPORT CONGIGURATION
app.use(require("express-session")({
	secret:"HELLO VANSHIKA",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//CALLING SEEDS FILE
seedDB();

//current user
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

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
	      res.redirect("/houses");
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

app.get("/houses/:id/comments/new",isLoggedIn,function(req,res){
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

//===========
//AUTH ROUTES
//===========
app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
	var newUser= new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/houses");
		});
	});
});

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/login",passport.authenticate("local",{
	successRedirect:"/houses",
	failureRedirect:"/login"

}),function(req,res){ });

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/houses");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}
//Port number is assigned.
app.listen(2000,function(){
	console.log("YelpCamp server started!!!!!");
});
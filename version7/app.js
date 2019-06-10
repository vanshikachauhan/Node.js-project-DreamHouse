//Setting up variables.
var express            =require("express"),
    app                =express(),
    bodyParser         =require("body-parser"),
    mongoose           =require("mongoose"),
    House              =require("./models/house"),
    seedDB             =require("./seeds"),
    Comment            =require("./models/comment"),
    passport           =require("passport"),
    LocalStratergy     =require("passport-local"),
    User               =require("./models/user");

var commentRoutes      =require("./routes/comments"),   
    housesRoutes       =require("./routes/houses"),
    indexRoutes         =require("./routes/index");

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

app.use(commentRoutes);
app.use(housesRoutes);
app.use(indexRoutes);

//current user
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

//CALLING SEEDS FILE
// seedDB();



//Port number is assigned.
app.listen(2000,function(){
	console.log("YelpCamp server started!!!!!");
});
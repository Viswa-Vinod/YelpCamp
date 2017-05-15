var  express 		= require("express"),
	 app 			= express(),
	 bodyParser 	= require("body-parser"),
	 mongoose 		= require("mongoose"),
	 Comment		= require("./models/comments"),
	 Campground     = require("./models/campground"),  //.js extension not required; that is implicit
	 seedDB			= require("./seeds"),
	 passport		= require("passport"),
	 LocalStrategy	= require("passport-local"),
	 expressSession	= require("express-session"),
	 methodOverride	= require("method-override"),
	 flash			= require("connect-flash"),
	 user			= require("./models/user");

//requiring routes
var	commentRoute		=	require("./routes/comments.js"),
	campgroundRoutes	=	require("./routes/campgrounds.js"),
	indexRoutes			=	require("./routes/index.js");

//mongoose.connect("mongodb://127.0.0.1/yelp_camp")

mongoose.connect("mongodb://yelpDB:yelpDB_vkviswa@ds143231.mlab.com:43231/vinod_yelpcamp");

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(flash()); //this has to come before the passport configuration

app.locals.moment = require("moment");
//PASSPORT CONFIGURATION
app.use(expressSession({

	secret: "Dog",
	resave: false,
	saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){ //used to transfer currentUser in every route and template

	res.locals.currentUser = req.user; //req.user will be empty if no one signed in, or will contain username and password of logged-in user
	res.locals.error = req.flash("error");  // the names of the keys "error" and "success" are up to you.
	res.locals.success = req.flash("success");
	next();
});



app.use(indexRoutes); //no common prefix exists for index routes; 
app.use("/campgrounds",campgroundRoutes); //campground routes will get /campgrounds prefixed to their path
app.use("/campgrounds/:id/comments",commentRoute); //comments routes will get /campgrounds/:id/comments prefixed to their path

//seedDB();


app.listen(process.env.PORT, process.env.IP);

/*
app.listen(3000, function(){

	console.log("Yelp ready");
});
*/

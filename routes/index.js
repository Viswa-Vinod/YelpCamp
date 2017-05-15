
//==========================
// ROOT ROUTE
//===========================
var express 	= 	require("express");
var router		=	express.Router();
var passport 	=	require("passport");
var user 		=	require("../models/user");


router.get("/", function(req,res){

	res.render("landing");
});


//==================================================

//AUTHENTICATION ROUTES

//=============================================

//SHOW Register form

router.get("/register", function(req, res){

	res.render("register",{page:"register"});
});


//handle sign-up logic
router.post("/register", function(req, res){

	var newUser = new user({username:req.body.username});

	user.register(newUser, req.body.password, function(err, user){

		if (err) {

			/*Per the docs, you can either set a flash message on the req.flash object before returning a res.redirect() or 
			you can pass the req.flash object into the res.render() function.*/
			
			return res.render("register",{"error": err.message});
		}

		passport.authenticate("local")(req, res, function(){
				req.flash("success", "Welcome to YelpCamp " + user.username);
				res.redirect("/campgrounds");
		});
	});
});

//LOGIN ROUTES

//shows login form
router.get("/login", function(req, res){

	res.render("login",{page:"login"}); 
});



//handles login
router.post("/login", passport.authenticate("local",{

	successRedirect: "/campgrounds",
	failureRedirect: "/login"

				}),function(req, res){

	
});

//logout

router.get("/logout", function(req, res){

	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/");
});


//middleware

module.exports = router;


//===================================
//CAMPGROUND ROUTES
//==================================

//index routes

var express		=		require("express");
var router		=		express.Router();
var Campground 	=		require("../models/campground.js");
var middleware	=		require("../middleware"); //no need to specify index.js because that is the file that is automatically searched for under a specified directory
var geocoder 	=  		require("geocoder");


//shows all campgrounds

router.get("/", function(req, res){

	Campground.find({}, function(err, DBcampgrounds){

		if (err) console.log(err);
		else {
				
				res.render("campgrounds/index", {campgrounds:DBcampgrounds, page:"campgrounds"});
			}
	});
	
	

});


//create - add item to DB
router.post("/", middleware.isLoggedIn, function(req, res){

	geocoder.geocode(req.body.location, function(err, data){

		if (err || !data.results[0]) {

			req.flash("error", "no geo-location was found")
			res.redirect("campgrounds/new");
		}	

		else {		

			var lat = data.results[0].geometry.location.lat;
			var lng = data.results[0].geometry.location.lng;
			var location  = data.results[0].formatted_address;

		
			var newCampGround = {
				name: req.body.name, 
				price: req.body.price,
				image: req.body.image, 
				description: req.body.description, 
				location: location,
				lat: lat,
				lng: lng,

				author: {
					id: req.user._id,
					username: req.user.username
				}
			};

			//campgrounds.push(newCampGround);

			Campground.create(newCampGround, function(err, newCGSubmitted){

					if (err) console.log(err);
					else {
							
							res.redirect("/campgrounds");

					}
			});

		}

	});
});


// new - show form to create new item in DB
router.get("/new", middleware.isLoggedIn, function(req,res){

	res.render("campgrounds/new");

});


//SHOW - show more info about a particular campground
router.get("/:id", function(req,res){

	//res.send("this will be the show page");
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){

		if (err) console.log(err);
		else res.render("campgrounds/show", {campGround:foundCampGround});
	});
	
});

//EDIT campground route

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){

	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){

		res.render("campgrounds/edit", {campGround:foundCampGround});
				
	});
	
});

//UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	geocoder.geocode(req.body.location, function (err, data) {

		if (err || !data.results[0]) {

			req.flash("error", "no geo-location was found")
			res.redirect("back");

		}

		else {
		   var lat = data.results[0].geometry.location.lat;
		   var lng = data.results[0].geometry.location.lng;
		   var location = data.results[0].formatted_address;
			
	    
		    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
				Campground.findByIdAndUpdate(req.params.id, {$set:newData}, function (err, DBupdatedBlog){

				if (err) {

					req.flash("error", err.message);
					res.render("/campgrounds/:id/edit");

				}
				else {

					req.flash("success", "Successfully Updated");
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}

	});	
});


//DESTROY campground route

 router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){


 	Campground.findByIdAndRemove(req.params.id, function(err){
 		if (err) res.redirect("/campgrounds");
 		else res.redirect("/campgrounds");
 	});
 });


// DELETE campground route



module.exports = router;
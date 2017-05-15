
//================================================
		//Comments Routes
//============================================


// create route for comments

var express		=		require("express");
var router		=		express.Router({mergeParams:true}); //mergeParams will merge params from campground and comments together so that inside the comment routes :id can be accessed
var Campground 	=		require("../models/campground.js");
var Comment		=		require("../models/comments.js");
var middleware	=		require("../middleware"); //no need to specify index.js because that is the file that is automatically searched for under a specified directory


//shows form to enter new comments if user is logged in
router.get("/new", middleware.isLoggedIn, function(req, res){

	Campground.findById(req.params.id, function(err, foundCampGround){

			if (err) console.log(err);
			else {

				res.render("comments/new", {campground:foundCampGround});			
			}

	})
	
});


//handles posting of a new comment, if user is logged in
router.post("/", middleware.isLoggedIn, function(req, res){

	
	Campground.findOne({_id:req.params.id},function(err, foundCampGround){

		if (err) {

			req.flash("error", "Campground not found");

		}
		else {
			
			Comment.create(req.body.comment, function(err, newComment){

				if (err) console.log(err);
				else {

					//add user name and id to comment
					newComment.author.username = req.user.username;
					newComment.author.id = req.user._id;
					//save comment
					newComment.save();
					foundCampGround.comments.push(newComment);	
					foundCampGround.save();
					req.flash("success", "Comment successfully added to post");
					res.redirect("/campgrounds/"+foundCampGround._id);
				}		
			});
		}

	});
	
});

//show edit comment form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){

	Campground.findOne({_id:req.params.id}, function(err, foundCampGround){ //the campground has to be found in DB because the campground name is being used in the comment/edit.ejs

		if (err) res.redirect("back");
		else {
				//console.log("found campground: "+ req.params.id + "getting comment: " + req.params.comment_id);

				Comment.findOne({_id:req.params.comment_id}, function(err, foundComment){

					res.render("comments/edit",{campground:foundCampGround, comment:foundComment});	
				});
				

		}
	});
	

});

//handling edits that have been submitted

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){

	
		Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){

			if (err) res.redirect("back"); //doubtful
			else res.redirect("/campgrounds/" + req.params.id);
	
		});
				
});

//DESTROY comment route

 router.delete("/:comment_id",  middleware.checkCommentOwnership, function(req, res){

 	
 	Comment.findByIdAndRemove(req.params.comment_id, function(err){
 		if (err) {

 			req.flash("error", "the comment could not be found")
 			res.redirect("back");

 		}
 		else {

 			req.flash("success", "Comment successfully deleted");
 			res.redirect("/campgrounds/" + req.params.id);
 		}
 	});
 });


module.exports = router;
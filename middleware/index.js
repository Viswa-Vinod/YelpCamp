//all middleware goes here
var Campground 	 =		require("../models/campground");
var Comment 	=		require("../models/comments");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if (req.isAuthenticated()){


			Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){

			if (err) {

				req.flash("error", "The campground could not be found")
				res.redirect("back");

			}
			
			else {
				
				//does the user own the campground?

				if (foundCampGround.author.id.equals(req.user.id)) { //better to use the .equals mongoose method because req.user.id and foundCampground.author.id are of different types
					
					next();

				} else {


					req.flash("error", "Only the owner of the campground post can do that");
					res.redirect("back");
				}

			}	
		});
	}

	else {

		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}


};

middlewareObj.checkCommentOwnership = function(req, res, next){
	
	if (req.isAuthenticated()){


				Comment.findById(req.params.comment_id, function(err, foundComment){

					if (err) {
						req.flash("error", "The comment could not be found")
						res.redirect("back");
					}
					
					else {
						
						//does the user own the campground?

						if (foundComment.author.id.equals(req.user.id)) { //better to use the .equals mongoose method because req.user.id and foundCampground.author.id are of different types
							
							next();

						} else {

							req.flash("error", "Only the owner of the comment can do that");
							res.redirect("back");
						}

					}	
				});
		}

	else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}


};

middlewareObj.isLoggedIn = function(req, res, next){

	if (req.isAuthenticated()){

		return next();
	}

	req.flash("error", "You need to be logged in to do that"); 
	/*the key name (error) is anthing you want; this step only adds the message to the key. 
	It does not display the message. */
	res.redirect("/login"); 
	//the rendering should happen AFTER the flash keys are set, otherwise the flash message  will not be displayed
	/*Per the docs, you can either set a flash message on the req.flash object before returning a res.redirect() or 
	you can pass the req.flash object into the res.render() function.*/

}

module.exports = middlewareObj;
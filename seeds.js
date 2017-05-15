var mongoose 	= 	require("mongoose"),
	Campground 	= 	require("./models/campground"),
	Comments 	=	require("./models/comments");

var data = [

	{name: "New York Palms", image:"https://static01.nyt.com/images/2017/01/03/travel/places-to-visit-1483468095725/places-to-visit-1483468095725-videoSixteenByNineJumbo1600-v11.jpg", 
	description:"Who are you talking to right now? Who is it you think you see? Do you know how much I make a year? I mean, even if I told you, you wouldn't believe it. Do you know what would happen if I suddenly decided to stop going into work? "},

	{name:"Eiffel Towers", image:"http://www.100placestovisit.com/wp-content/uploads/2013/07/100-places-to-visit-before-you-die-paris.jpg", 
	description:"Who are you talking to right now? Who is it you think you see? Do you know how much I make a year? I mean, even if I told you, you wouldn't believe it. Do you know what would happen if I suddenly decided to stop going into work? "},

	{name:"Burj Khalifa", image:"http://www.nstravel.ro/wp-content/uploads/2017/04/most-luxurios-places-to-visit-in-dubai.jpg", 
	description:"Who are you talking to right now? Who is it you think you see? Do you know how much I make a year? I mean, even if I told you, you wouldn't believe it. Do you know what would happen if I suddenly decided to stop going into work? "},

	{name:"London eye", image:"http://www.trendcrackers.com/wp-content/uploads/2016/04/places-to-visit-in-london2.jpg", 
	description:"Who are you talking to right now? Who is it you think you see? Do you know how much I make a year? I mean, even if I told you, you wouldn't believe it. Do you know what would happen if I suddenly decided to stop going into work? "},

	{name:"Rome", image:"http://www.planetware.com/photos-large/I/italy-best-places-to-visit-rome-forum.jpg", 
	description:"Who are you talking to right now? Who is it you think you see? Do you know how much I make a year? I mean, even if I told you, you wouldn't believe it. Do you know what would happen if I suddenly decided to stop going into work? "}	
	
];


function seedDB(){

	//remove all campgrounds
	Campground.remove({}, function(err){

		/*if (err) console.log(err);

		else {
			console.log("removed campgrounds");

				data.forEach(function(seed){

					Campground.create(seed, function(err, datum){

						if (err) console.log(err);
						else {

							console.log("added a campground");
							//add comments
								Comments.create({

									text:"this place is great",
									author:"Homer"
								}, function(err, createdComm){

									if (err) console.log(err);
									else {

										console.log(createdComm);
										console.log("associating comment with campground");
										datum.comments.push(createdComm);
										datum.save();
										console.log("created new comment against campground");
									}
								});
						}
					});

				});
		}*/
	});

	// add a few campgrounds

}

module.exports = seedDB;
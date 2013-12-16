/*
 *	application / app.js
 *	
 *	Initializes the application. The first three cities are hardcoded for now,
 * 	but should use ajax requests to a backend server to fetch info at a later point.
 *
 */


/* MODELS */
var c1 = new City({
	id		: 1,
	name 	: "San Francisco",
	mapCoordinates : {
		latitude : 37.785097,
		longtitude : -122.439707
	},
	itineraries : {
		oneDay : {
			dayOne : {
				p1 : {
					name : "One",
					description : "AAAAAAAAAAAAAA",
					latitude : 37.78192, 
					longtitude : -122.41135
				},
				p2 : { 
					name : "Two",
					description : "BBBBBBBBBBBBB",
					latitude : 37.79236, 
					longtitude : -122.39847 
				},
				p3 : { 
					name : "Three",
					description : "ccccccccccccc",
					latitude : 37.80661, 
					longtitude : -122.40671
				}
			}
		},
		twoDay : {
			dayOne : {
				p1 : {
					name : "One",
					description : "AAAAAAAAAAAAAA",
					latitude : 37.78924, 
					longtitude : -122.41770
				},
				p2 : { 
					name : "Two",
					description : "BBBBBBBBBBBBB",
					latitude : 37.79575, 
					longtitude : -122.41049
				},
				p3 : { 
					name : "Three",
					description : "ccccccccccccc",
					latitude : 37.80294, 
					longtitude : -122.40791
				}
			},
			dayTwo : {
				p1 : {
					name : "One",
					description : "AAAAAAAAAAAAAA",
					latitude : 37.78192, 
					longtitude : -122.41135
				},
				p2 : { 
					name : "Two",
					description : "BBBBBBBBBBBBB",
					latitude : 37.79236, 
					longtitude : -122.39847 
				},
				p3 : { 
					name : "Three",
					description : "ccccccccccccc",
					latitude : 37.80661, 
					longtitude : -122.40671
				}
			}
		},
		threeDay : {
			dayOne : {
				p1 : {
					name : "One",
					description : "AAAAAAAAAAAAAA",
					latitude : 37.78192, 
					longtitude : -122.41135
				},
				p2 : { 
					name : "Two",
					description : "BBBBBBBBBBBBB",
					latitude : 37.79236, 
					longtitude : -122.39847 
				},
				p3 : { 
					name : "Three",
					description : "ccccccccccccc",
					latitude : 37.80661, 
					longtitude : -122.40671
				}
			},
			dayTwo : {
				p1 : {
					name : "One",
					description : "AAAAAAAAAAAAAA",
					latitude : 37.78924, 
					longtitude : -122.41770
				},
				p2 : { 
					name : "Two",
					description : "BBBBBBBBBBBBB",
					latitude : 37.79575, 
					longtitude : -122.41049
				},
				p3 : { 
					name : "Three",
					description : "ccccccccccccc",
					latitude : 37.80294, 
					longtitude : -122.40791
				}
			},
			dayThree : {
				p1 : {
					name : "One",
					description : "AAAAAAAAAAAAAA",
					latitude : 37.78824, 
					longtitude : -122.41770
				},
				p2 : { 
					name : "Two",
					description : "BBBBBBBBBBBBB",
					latitude : 37.79375, 
					longtitude : -122.41049
				},
				p3 : { 
					name : "Three",
					description : "ccccccccccccc",
					latitude : 37.80274, 
					longtitude : -122.40791
				}
			}
		}
	}
});
var c2 = new City({
	id : 2,	
	name : "New Delhi",
	mapCoordinates : {
		latitude : 28.633086,
		longtitude : 77.219975
	}
});
var c3 = new City({
	id : 3,
	name : "Rio de Janeiro",
	mapCoordinates : {
		latitude : -22.949502,
		longtitude : -43.184387
	}
});



/* COLLECTIONS */
var cities = new Cities();
cities.add(c1);
cities.add(c2);
cities.add(c3);



/* VIEWS */
var homeView = new HomeView({
	cities: cities
});
var mapView = new MapView({
	//
});



/* ROUTER */
var router = new Router;

router.on('route:home', function() {
	homeView.render();
});

router.on('route:map', function(id) {
	var city = cities.get(id);
	mapView.render(city);
})



/* APPLICATION START */
Backbone.history.start();
console.log("Application Started");
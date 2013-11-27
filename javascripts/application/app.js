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
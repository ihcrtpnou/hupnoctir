/*
 *	router / router.js
 *	
 *	The main application router. 
 * 	Pretty trivial for now.
 */

var Router = Backbone.Router.extend({
	routes: {
		"" 		 	: 	"home",
		"map/:id"	: 	"map"
	}
});
/*
 *	views / map.js
 *	
 *	The view for the map page of the application.
 *	Only the initial stage for now - will have to develop this.
*/

var MapView = Backbone.View.extend({
	id: 'map',

	/*
		Nothing done when initialized for now!
	*/
	initialize: function(){

	},

	/*
		The render function takes in a city.ks model of the destination city.
		The mapOptions is then passed on to the google maps contructor to
		set the map.

		The #template_map is loaded, them the map is inserted into the view.
	*/
	render: function(city){

		var mapOptions = {
			center: new google.maps.LatLng(
				city.get('mapCoordinates').latitude, city.get('mapCoordinates').longtitude),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
		};

		var map = new google.maps.Map(this.el, mapOptions);

		var template = _.template($('#template_map').html());
		$('#main').html(template);

		$('#map').replaceWith(this.el);
		google.maps.event.trigger(map, 'resize');
		$('#map').height("800px");

		map.panTo(mapOptions.center);
	}
});
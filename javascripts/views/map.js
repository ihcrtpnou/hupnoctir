/*
 *	views / map.js
 *	
 *	The view for the map page of the application.
 *	Only the initial stage for now - will have to develop this.
 */


var MapView = Backbone.View.extend({

	map: null,
	city: null,

	buttonItineraryMap : {},

	paths: [],
	markers: [],		

	/*
		Nothing done when initialized for now!
	*/
	initialize: function(){
		this.setElement('#main');
	},

	/*
		Map View Event Handlers.

		Clicking on a map control option will trigger the appropriate handler.
	*/
	events: {
		"click .map_control_option" : "handler_renderItineraryButtons",
		"click .map_control_itinerary_button" : "handler_displayItineraryRoutes"
	},

	/*
		The render function takes in a city.ks model of the destination city.
		The mapOptions is then passed on to the google maps contructor to
		set the map.

		The #template_map is loaded, them the map is inserted into the view.
	*/
	render: function(city){

		this.city = city;

		$('#main').html( _.template($('#template_map').html()) );

		this.helper_DisplayMap();
		this.helper_DisplayTitle();
	},



	handler_renderItineraryButtons: function(event) {
		var id = event.target.id;
		var container = document.getElementById('map_control_days');

		container.innerHTML = "";

		if (id == "map_control_options_one_day_button") {
			var button1 = ButtonFactory('i1d1', 'map_control_itinerary_button', 'Day 1');
			container.appendChild(button1);
			this.buttonItineraryMap['i1d1'] = this.city.get('itineraries').oneDay.dayOne;
		}
		else if (id == "map_control_options_two_day_button") {
			var button1 = ButtonFactory('i2d1', 'map_control_itinerary_button', 'Day 1');
			var button2 = ButtonFactory('i2d2', 'map_control_itinerary_button', 'Day 2');
			container.appendChild(button1);
			container.appendChild(button2);
			this.buttonItineraryMap['i2d1'] = this.city.get('itineraries').twoDay.dayOne;
			this.buttonItineraryMap['i2d2'] = this.city.get('itineraries').twoDay.dayTwo;
		}
		else {
			var button1 = ButtonFactory('i3d1', 'map_control_itinerary_button', 'Day 1');
			var button2 = ButtonFactory('i3d2', 'map_control_itinerary_button', 'Day 2');
			var button3 = ButtonFactory('i3d3', 'map_control_itinerary_button', 'Day 3');
			container.appendChild(button1);
			container.appendChild(button2);
			container.appendChild(button3);
			this.buttonItineraryMap['i3d1'] = this.city.get('itineraries').threeDay.dayOne;
			this.buttonItineraryMap['i3d2'] = this.city.get('itineraries').threeDay.dayTwo;
			this.buttonItineraryMap['i3d3'] = this.city.get('itineraries').threeDay.dayThree;
		}
	},

	handler_displayItineraryRoutes: function(event) {
		var buttonId = event.target.id;
		var itinerary = this.buttonItineraryMap[buttonId];

		this.helper_DisplayPath(itinerary);
		this.helper_DisplayMarkers(itinerary);
		this.helper_DisplayDetails(itinerary);
	},



	helper_DisplayMap: function() {
		var mapOptions = {
			center: new google.maps.LatLng(
				this.city.get('mapCoordinates').latitude, this.city.get('mapCoordinates').longtitude),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
		};

		var map = new google.maps.Map(document.getElementById('map'), mapOptions);

		google.maps.event.trigger(map, 'resize');
		map.panTo(mapOptions.center);
		map.setZoom( map.getZoom() );
		map.setCenter(new google.maps.LatLng(this.city.get('mapCoordinates').latitude, this.city.get('mapCoordinates').longtitude));
		this.map = map;
	},

	helper_DisplayTitle: function() {
		var titleContainer = document.getElementById('map_control_title');
		titleContainer.innerHTML = this.city.get('name');
	},

	helper_DisplayPath: function(itinerary) {

		this.helper_RemoveAllPaths();

		var coordinatesList = [];
		for (var c in itinerary) {
			coordinatesList.push(new google.maps.LatLng(
				itinerary[c].latitude, itinerary[c].longtitude));
		}

		var mapsPath = new google.maps.Polyline({
			path: coordinatesList,
			strokeColor: '#FF10F3',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});

		this.paths.push(mapsPath);

		mapsPath.setMap(this.map);
	},

	helper_DisplayMarkers: function(itinerary) {

		this.helper_RemoveAllMarkers();

		for (var c in itinerary) {
			var temp = new google.maps.LatLng(itinerary[c].latitude, itinerary[c].longtitude);
			var marker = new google.maps.Marker({
				position: temp,
				animation: google.maps.Animation.DROP,
				map: this.map
			});
			var contentString = 
				'<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
				'<div id="bodyContent">'+
				'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
				'sandstone rock formation in the southern part of the '+
				'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
				'south west of the nearest large town, Alice Springs; 450&#160;km '+
				'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
				'features of the Uluru - Kata Tjuta National Park. Uluru is '+
				'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
				'Aboriginal people of the area. It has many springs, waterholes, '+
				'rock caves and ancient paintings. Uluru is listed as a World '+
				'Heritage Site.</p>'+
				'<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
				'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
				'(last visited June 22, 2009).</p>'+
				'</div>'+
				'</div>';
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			marker.setMap(this.map);

			this.markers.push(marker);

			(function(m){
				google.maps.event.addListener(m, 'click', function() {
					infowindow.open(this.map, m);
				});
			})(marker);

		}
	},

	helper_DisplayDetails: function(itinerary) {
		this.helper_RemoveAllDetails();

		//
	},

	helper_RemoveAllMarkers: function() {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}
		this.markers = [];
	},

	helper_RemoveAllPaths: function() {
		for (var i = 0; i < this.paths.length; i++) {
			this.paths[i].setMap(null);
		}
		this.paths = [];
	},

	helper_RemoveAllDetails: function() {
		// set the inner html of the details section to nothing
		document.getElementById('map_control_details').innerHTML = "";
	}

});


function ButtonFactory(i, c, d) {
 	var button = document.createElement('button');
 	button.id = i;
 	button.className = c;
 	button.appendChild(document.createTextNode(d));
 	return button;
};
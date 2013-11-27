/*
 *	models / city.js
 *	
 *	Represents the destiation/city.
 * 	The id must be unique, and the mapCoordinates denote
 * 	where the map should center when the map view loads/
 * 	More attributes should be added.
*/

var City = Backbone.Model.extend({
	defaults : {
		id	 : 1,
		name : null,
		mapCoordinates : {
			latitude : 0,
			longtitude : 0	
		}
	},

	label: function () {
        return this.get("name");
    }

});
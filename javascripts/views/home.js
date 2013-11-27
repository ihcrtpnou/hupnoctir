/*
 *	views / home.js
 *	
 *	The view for the home/landing page of the application.
 *	Sets the el to the div element #main from the body. 
 *
 *	Simple for now, may get complicated later?
*/

var HomeView = Backbone.View.extend({
	el: '#main',

	/*
		On render, it will load the template: #template_home to the #main div.
 		It will then set up the auto complete search part to the 
 		search box. The AutoCompleteView will take in the input element
		and the collection of cities (definied when application loaded 
 		in app.js).
 	*/
	render: function() {
		var template = _.template($('#template_home').html());
	
		this.$el.html(template);

		new AutoCompleteView({
		    input: this.$("#home_input_search"),
		    model: cities
		}).render();

	}
});


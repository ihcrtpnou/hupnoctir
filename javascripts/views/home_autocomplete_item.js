/*
 *  views / home_autocomplete_item.js
 *  
 *  The view for the individual 'items' in the autocomplete view.
 *  The autocompete.js view uses this subview to populate the list/
 *  On creation of the view, the city.js model is passed into the view,
 *  then uses the 'label' attribute to display the name.
*/

var AutoCompleteItemView = Backbone.View.extend({
    tagName: "li",
    template: _.template('<a href="#map"><%= label %></a>'),

    /*
        Event Handlers. On click, trigger the select function
    */
    events: {
        "click": "select"
    },

    /*
        On render, load the custom template, passing in the model.label
    */
    render: function () {
        this.$el.html(this.template({
            "label": this.model.label()
        }));
        return this;
    },


    /*
        On select, route the application to the appropriate map view.
        The application router will route the map/:id accordingly.

        The usage of router.navigate seems to be discouraged, but will do for now.
        Refactor later on.
    */
    select: function () {

        var route = "map/" + this.model.id;
        router.navigate(route, true);
        return false;
    }

});
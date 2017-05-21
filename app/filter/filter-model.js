define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    let FilterModel = Backbone.Model.extend({
        defaults : {
            filter: ''
        },

        setFilter: function(filter){
            this.set('filter', filter);
        }
    })

    return FilterModel;
});
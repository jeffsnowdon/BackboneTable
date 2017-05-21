define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    let FilterModel = Backbone.Model.extend({
        defaults : {
            filter: '',
            targetColumnNames: [],
            placeholder: ""
        },

        setFilter: function(filter){
            this.set('filter', filter);
        },

        setTargetColumnNames: function(targetColumnNames){
            this.set("targetColumnNames", targetColumnNames);
        }


    })

    return FilterModel;
});
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    let RowModel = Backbone.Model.extend({
        defaults : {
            columnData: [],
            selected: false
        },

        initialize: function(){
            this.listenTo(this, "change", function(){
                this.set("columnName", this.get('columnData')[0]);
            });
            this.set("columnName", this.get('columnData')[0]);
        },

        toggleSelected: function () {
            this.set('selected', !this.get('selected'));
        }
    })

    return RowModel;
});
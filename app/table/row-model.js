define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    let RowModel = Backbone.Model.extend({
        defaults: {
            //<columnName, data>
            data: {},
            //columnIndexMapping
            columnIndexMap: {},
            columnData: [],
            selected: false
        },

        updateRenderableData: function () {
            let columnData = [];
            let data = this.get('data');
            Object.keys(data).forEach(function (columnName) {
                let index = this.get('columnIndexMap')[columnName];
                let associatedData = data[columnName];
                columnData.push(associatedData);
            }, this);
            this.set('columnData', columnData, {silent: true});
        },

        toggleSelected: function () {
            this.set('selected', !this.get('selected'));
        }
    })

    return RowModel;
});
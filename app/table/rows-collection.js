define(['jquery', 'underscore', 'backbone', 'app/table/row-model'], function ($, _, Backbone, RowModel) {
    let RowsCollection = Backbone.Collection.extend({
        model: RowModel,
    });
    return RowsCollection;
});
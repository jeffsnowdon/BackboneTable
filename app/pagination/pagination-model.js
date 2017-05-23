define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    let FilterModel = Backbone.Model.extend({
        defaults : {
            rowsPerPage: 100,
            currentPageIndex: 0
        }
    });
    return FilterModel;
});
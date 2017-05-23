define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    let FilterModel = Backbone.Model.extend({
        defaults : {
            filter: '',
            targetColumnNames: [],
            placeholder: ""
        }
    });

    return FilterModel;
});
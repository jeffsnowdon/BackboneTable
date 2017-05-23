define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    let PaginationModel = Backbone.Model.extend({
        defaults: {
            rowsPerPage: 100,
            currentPageIndex: 0,
            numPages: 0
        },
        initialize: function () {
            this.listenTo(this, "change numPages", this.numPagesUpdated);
        },
        numPagesUpdated: function () {
            //validate current page
            if (this.get('numPages') <= this.get('currentPageIndex')) {
                this.set('currentPageIndex', 0);
            }
        },
        nextPage: function () {
            if (this.get('numPages') > (this.get('currentPageIndex') + 1))
                this.set('currentPageIndex', (this.get('currentPageIndex') + 1));
        },
        prevPage: function () {
            if (this.get('currentPageIndex') > 0)
                this.set('currentPageIndex', (this.get('currentPageIndex') - 1));
        }
    });
    return PaginationModel;
});
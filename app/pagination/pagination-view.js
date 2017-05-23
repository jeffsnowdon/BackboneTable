define(['jquery', 'underscore', 'backbone', 'text!../../../tpl/PaginationView.html'], function ($, _, Backbone, PaginationViewTemplate) {
    let PaginationView = Backbone.View.extend({
        template: _.template(PaginationViewTemplate),

        tagName: 'form',

        className: 'bb-pagination-container',

        events: {
            'input.change': 'pageChanged'
        },

        pageChanged: function (e) {
            let page = 0;
            try {
                page = parseInt(this.pageInputTextField.val());
                if (isNaN(page) || !page){
                    page = 0;
                }
            } catch (e) {
                console.log('unable to parse page');
            }
            this.model.set('currentPageIndex', page);
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            if (!this.pageInputTextField) {
                this.$el.html(this.template(this.model.attributes));
                this.pageInputTextField = this.$("#page");
            }

            this.pageInputTextField.val(this.model.get('currentPageIndex'));

            return this;
        }
    })

    return PaginationView;
});
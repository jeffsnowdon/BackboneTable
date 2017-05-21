define(['jquery', 'underscore', 'backbone', 'text!../../../tpl/rowView.html'], function ($, _, Backbone, rowViewTemplate) {
    let RowView = Backbone.View.extend({
        template: _.template(rowViewTemplate),

        tagName: 'tr',

        className: 'bb-table-row',

        events: {
            'click': 'select'
        },

        select: function (e) {
            this.model.toggleSelected();
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            if (this.model.get('selected')) {
                this.$el.addClass('selected');
            } else {
                this.$el.removeClass('selected');
            }
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    })

    return RowView;
});
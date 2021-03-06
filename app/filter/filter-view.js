define(['jquery', 'underscore', 'backbone', 'text!../../../tpl/filterView.html'], function ($, _, Backbone, filterViewTemplate) {
    let FilterView = Backbone.View.extend({
        template: _.template(filterViewTemplate),

        tagName: 'form',

        className: 'bb-filter-container',

        events: {
            'input.change': 'filterChanged'
        },

        filterChanged: function (e) {
            this.model.set('filter', this.filterInputTextField.val());
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            if (!this.filterInputTextField){
                this.$el.html(this.template(this.model.attributes));
                this.filterInputTextField = this.$("#filter");    
            }

            this.filterInputTextField.val(this.model.get('filter'));
            
            return this;
        }
    })

    return FilterView;
});
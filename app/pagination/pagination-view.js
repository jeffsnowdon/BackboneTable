define(['jquery', 'underscore', 'backbone', 'text!../../../tpl/PaginationView.html'], function ($, _, Backbone, PaginationViewTemplate) {
    let PaginationView = Backbone.View.extend({
        template: _.template(PaginationViewTemplate),

        tagName: 'form',

        className: 'bb-pagination-container',

        events: {
            'click button': 'buttonClicked'
        },

        buttonClicked: function (e) {
            let button = e.target;
            let buttonText = button.innerHTML;
            if (buttonText === "Next") {
                this.model.nextPage();
            } else if (buttonText === "Prev") {
                this.model.prevPage();
            } else {
                let pageNumStr = button.innerHTML;
                let pageNum = parseInt(pageNumStr);
                if (!pageNum || isNaN(pageNum)) {
                    console.log('Error parsing page number');
                    return;
                }
                this.model.set('currentPageIndex', pageNum);
            }
        },

        initialize: function (options) {
            this.filteredRowsCollection = options.filteredRowsCollection;
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.filteredRowsCollection, 'add remove reset update', function(){
                this.model.set('numPages', this.filteredRowsCollection.calculateNumPages());
                this.render();
            }, this);
        },

        render: function () {
            this.$el.empty();

            let numPages = this.model.get('numPages');
            let currentPageIndex = this.model.get('currentPageIndex');

            let currentPageBlock = $('<span class="bb-current-page">');
            let prevPageBlock = $('<button type="button">');
            let nextPageBlock = $('<button type="button">');


            currentPageBlock.text(currentPageIndex);
            prevPageBlock.text('Prev');
            nextPageBlock.text('Next');

            let centeredContainer = $('<div class="bb-table-cell-center">');

            centeredContainer.append(prevPageBlock);
            centeredContainer.append(currentPageBlock);
            centeredContainer.append(nextPageBlock);

            this.$el.append(centeredContainer);

            if (currentPageIndex <= 0)
                prevPageBlock.attr('disabled', true);
            if (numPages <= (currentPageIndex + 1)){
                nextPageBlock.attr('disabled', true);
            }

            return this;
        }
    })

    return PaginationView;
});
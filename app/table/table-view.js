define(['jquery', 'underscore', 'backbone', 'app/table/row-view'], function ($, _, Backbone, RowView) {
    let TableView = Backbone.View.extend({
        tagName: "div",

        className: "bb-table-container",

        events: {
            'click th': 'sort'
        },

        sort: function (e) {
            let target = e.target;
            if (target.nodeName == "TH"){
                target = target.firstChild;
            }
            let columnName = target.innerHTML;
            if (columnName);
            this.collection.toggleSortColumn(columnName);
        },

        initialize: function () {
            this.listenTo(this.collection, "add remove reset sort", function () {
                this.render();
            });
        },

        render: function () {
            this.$el.empty();

            let sortColumn = this.collection.sortColumn;
            let sortAscending = this.collection.sortAscending;

            //head
            let tableHeader = $("<thead>");
            let columnNames = this.collection['columnNames'];
            _.each(columnNames, function (columnName) {
                let headerEntry = $("<th>");
                let sortLink = $("<a>");
                sortLink.append(columnName);
                if (columnName === sortColumn){
                    sortLink.addClass('sort');
                    if (sortAscending)
                        sortLink.addClass('sort-ascending');
                    else
                        sortLink.addClass('sort-descending');
                }
                headerEntry.append(sortLink);
                

                tableHeader.append(headerEntry);
            });

            //body
            let tableBody = $("<tbody>");
            // let maxRowCount = Math.min(10, this.collection.length);
            // for (let i=0;i<maxRowCount;i++){
            //     let rowModel = this.collection.at(i);
            //     var rowView = new RowView({ model: rowModel });
            //     tableBody.append(rowView.render().el);
            // }
            this.collection.each(function (rowModel) {
                var rowView = new RowView({ model: rowModel });
                tableBody.append(rowView.render().el);
            }, this);

            let tableElement = $("<table>");
            tableElement.append(tableHeader);
            tableElement.append(tableBody);

            this.$el.append(tableElement);

            

            return this;

        },

        getSelectedRows: function () {
            return this.collection.where({ selected: true });
        }
    });

    return TableView;
});
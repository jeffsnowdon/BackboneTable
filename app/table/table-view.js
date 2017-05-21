define(['jquery', 'underscore', 'backbone', 'app/table/row-view'], function ($, _, Backbone, RowView) {
    let TableView = Backbone.View.extend({
        tagName: "table",

        className: "bb-table",

        events: {
        },

        initialize: function () {
            this.listenTo(this.collection, "add remove reset", function(){
                this.render();
            });
        },

        render: function () {
            console.log("table render");
            this.$el.empty();
            //head
            let tableHeader = $("<thead>");
            let columnNames = this.collection['columnNames'];
            let tableHeaderStr = "";
            _.each(columnNames, function(columnName){
                tableHeaderStr += "<th>" + columnName + "</th>";
            });
            tableHeader.html(tableHeaderStr);
            //body
            let tableBody = $("<tbody>");
            let maxRowCount = Math.min(10, this.collection.length);
            // for (let i=0;i<maxRowCount;i++){
            //     let rowModel = this.collection.at(i);
            //     var rowView = new RowView({ model: rowModel });
            //     tableBody.append(rowView.render().el);
            // }
            this.collection.each(function (rowModel) {
                var rowView = new RowView({ model: rowModel });
                tableBody.append(rowView.render().el);
            }, this);
            this.$el.append(tableHeader);
            this.$el.append(tableBody);
            return this;

        }
    })

    return TableView;
});